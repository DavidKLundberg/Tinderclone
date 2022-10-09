from rest_framework import serializers
from VDB import models
from django.contrib.auth.models import User
from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.account import app_settings
from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import force_text
from allauth.account import app_settings
#from django.utils import six
from rest_framework import serializers, exceptions
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from django.db.models import Q
from django.contrib.gis.geos import Point
#from drf_extra_fields.geo_fields import PointField
from django.contrib.gis.measure import Distance  

class LoginSerializer(serializers.Serializer):
	email = serializers.EmailField(required=False, allow_blank=True)
	password = serializers.CharField(style={'input_type': 'password'})


	def _validate_email(self, email, password):
		user = None

		if email and password:
			user = authenticate(email=email, password=password)

		else:
			msg = _('Must include "email" and "password".')
			raise exceptions.ValidationError(msg)

		return user
	
	def validate(self, attrs):
		email = attrs.get('email')
		password = attrs.get('password')
		user = None

		user = self._validate_email(email, password)
		if user:
			if not user.is_active:
				msg = _('User account is disabled.')
				raise exceptions.ValidationError(msg)
		else: 
			msg = ('Unable to log in with provided credentials.')
			raise exceptions.ValidationError(msg)
		attrs['user'] = user
		return attrs

class RegisterSerializer(serializers.Serializer):
	email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
	password1 = serializers.CharField(required=True, write_only=True)
	password2 = serializers.CharField(required=True, write_only=True)

	def validate_email(self, email):
		email = get_adapter().clean_email(email)
		if allauth_settings.UNIQUE_EMAIL:
			if email and email_address_exists(email):
				raise serializers.ValidationError(
					("A user is already registered with this e-mail address."))
		return email

	def validate_password1(self, password):
		return get_adapter().clean_password(password)

	def validate(self, data):
		if data['password1'] != data['password2']:
			raise serializers.ValidationError(
				("The two password fields didn't match."))
		return data

	def get_cleaned_data(self):
		return {
			'password1': self.validated_data.get('password1', ''),
			'password2': self.validated_data.get('password2', ''),
			'email': self.validated_data.get('email', ''),

	
 
		}

	def save(self, request):
		adapter = get_adapter()
		user = adapter.new_user(request)
		self.cleaned_data = self.get_cleaned_data()
		adapter.save_user(request, user, self)
		setup_user_email(request, user, [])
		user.save()
		return user

class MessageSerializer(serializers.ModelSerializer):
	class Meta: 
		fields = "__all__"
		model = models.Message


class ReportsSerializer(serializers.ModelSerializer):

	class Meta: 
		fields = '__all__'
		model = models.Reports


class ImagesSerializer(serializers.ModelSerializer):
	class Meta: 
		fields = ("id", "owner","image1")
		model = models.Images


class ExpoPushTokenSerializer(serializers.ModelSerializer):
	class Meta:
		fields= '__all__'
		model = models.ExpoPushToken

class PremiumMatchesSerializer(serializers.ModelSerializer):
	class Meta: 
		fields = '__all__'
		model = models.Matches

class PaymentSerializer(serializers.ModelSerializer):
	class Meta: 
		fields = "__all__"
		model = models.Payment

class PersonalSerializer(serializers.ModelSerializer):
	Images = ImagesSerializer(many=True, read_only=True)
	#PushToken = PushTokenSerializer(many=True, read_only=True)
	Matches = PremiumMatchesSerializer(many=True, read_only=True)
	class Meta: 
		fields = "__all__"
		model = models.Personal

class PersonalDataForOthersSerializer(serializers.ModelSerializer):
	Images = ImagesSerializer(many=True, read_only=True) 
	class Meta: 
		exclude = ["owner","maxAgeOfInterest", "minAgeOfInterest", "interestedInMale","interestedInFemale","interestedInOther"]
		model = models.Personal

class RoomSerializer(serializers.ModelSerializer):
	Message = MessageSerializer(many=True, read_only=True)
	userOnePersonal = PersonalDataForOthersSerializer(source="userOne", read_only=True)
	userTwoPersonal = PersonalDataForOthersSerializer(source="userTwo", read_only=True)
	class Meta: 
		fields = '__all__'
		model = models.Room

class MatchesSerializer(serializers.ModelSerializer):
	owner = PersonalSerializer(read_only=True)
	roomSerializer = RoomSerializer(required=False)
	class Meta: 
		fields = '__all__'
		model = models.Matches

class TokenSerializer(serializers.ModelSerializer):
	Personal = PersonalSerializer(many=True, read_only=True)
	class Meta:
		model = models.Token
		#fields = "__all__"
		fields = ('key', 'Personal')
		

"""
# 	def get_queryset(self):
# 		longitude = self.request.query_params.get('longitude')
# 		latitude= self.request.query_params.get('latitude')
# 		radius = self.request.query_params.get('radius')
# 		minAge = self.request.query_params.get('minAge')
# 		maxAge = self.request.query_params.get('maxAge')
# 		quizResult = self.request.query_params.get('minAge')
# 		minAge = self.request.query_params.get('minAge')
# 		minAge = self.request.query_params.get('minAge')
# 		quizQuestionsAnsweredForSelf = self.request.query_params.get('quizQuestionsAnsweredForSelf')
# 		quizQuestionsAnsweredForPartner = self.request.query_params.get('quizQuestionsAnsweredForPartner')
# 		genderOfInterest = self.request.query_params.get('genderOfInterest')
# 		gender = self.request.query_params.get('gender')

# 		location = Point(longitude, latitude)

# 		usersLocation = Personal.objects.filter(location__distance_lt=(location, Distance(km=radius))).filter()
# #			usersLocation = Personal.objects.filter(location__distance_lte=(location, D(m=distance))).distance(location).order_by('distance')
# 		userAge = Personal.objects.filter(usersLocation=blablabal )


# 		return queryset
	def get_queryset(self):
		#Filter potential partners based on what the user has put in
		potentialDates = []
		queryset = Personal.objects.filter(Q(age__lte="Too Young") & Q(age__gte="Too old")
			& Q(location=location) & Q(gender=gender)  & Q(fields__lte=quizResult) )

		#filter so that the user is based on what the queried user put in
#		for query in queryset:
#			if Personal.genderOfInterest == UserGender:
#				if Personal.minAge <= UserAge && Personal.maxAge >= UserAge:
#					if Personal.tolerableLocation >= UserLocation:
#						if Personal.quizQuestionsAnsweredForPartner == "some algoritm for similairities":
#							potentialDates.append(que)
#
#		return potentialDates
"""
class LegalSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Legal
		fields = "__all__"

class UserSerializer(serializers.HyperlinkedModelSerializer):
	Personal = PersonalDataForOthersSerializer(many=True, read_only=True)
	#PushToken = PushTokenSerializer(many=True, read_only=True)
	roomSerializer = RoomSerializer(many=True, read_only=True)
	Reports = ReportsSerializer(many=True, read_only=True)
	class Meta:
		model = models.User
		
		exclude = ['is_staff',"is_superuser","email","password","user_permissions","groups"]

"""
    {
        "id": 3,
        "reportedNumber": 2,
        "reportedReason": "2",
        "dateOfReport": "2019-06-19T12:59:56.989082Z",
        "reportedUser": "2",
        "location": {
            "type": "Point",
            "coordinates": [
                75.0001,
                75.0001
            ]
        }
    }
]
"""