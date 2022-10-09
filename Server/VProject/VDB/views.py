from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from VDB.models import *
from VDB.serializers import *
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework import mixins
from rest_framework import generics
from VDB import permissions
from django.utils import timezone
from django.db.models import Q
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D

from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework import viewsets
from rest_framework.decorators import action
#from rest_framework import render
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage
from exponent_server_sdk import PushTicketError
from exponent_server_sdk import PushServerError
from requests.exceptions import ConnectionError
from requests.exceptions import HTTPError
from rest_auth.views import LoginView
from django.http import HttpResponseForbidden    


import time

class LegalView(viewsets.ModelViewSet):
	queryset = Legal.objects.all()
	serializer_class = LegalSerializer

class FacebookLogin(SocialLoginView):
	adapter_class = FacebookOAuth2Adapter


class USEViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
#	permission_classes = (permissions.IsAuthenticated, permissions.IsOwnerOrReadOnly,)


class PersonalView(viewsets.ModelViewSet):
	serializer_class = PersonalSerializer
#	permission_classes = (permissions.IsAuthenticated, permissions.IsOwnerOrReadOnly,)
	def get_queryset(self):
	
		minAgeOfInterest = self.request.query_params.get("minAgeOfInterest")
		matchesOwner = self.request.query_params.get("matchesOwner")
		
		#userPersonalityOne, its a slight variation on userPersonality
		if (minAgeOfInterest is not None):
			longitude = self.request.query_params.get('longitude')
			latitude= self.request.query_params.get('latitude')
			radius = self.request.query_params.get('radius')
			personalityMatch = self.request.query_params.get('personalityMatch')
			gender = self.request.query_params.get('gender')
			interestedInFemale = self.request.query_params.get('interestedInFemale')
			interestedInMale = self.request.query_params.get('interestedInMale')

			interestedInOther = self.request.query_params.get('interestedInOther')
			filterHasPayed = self.request.query_params.get('filterHasPayed')
			userId = self.request.query_params.get('userId')
			userId = int(userId)
			userPersonality = self.request.query_params.get('userPersonality')
			partnerPersonalityOne = self.request.query_params.get('partnerPersonalityOne')
			
			genderQuery = Q(interestedInFemale=True)
			genderQueryTwo = Q(interestedInFemale=True)
			hasPayedQuery = Q()
			gender = int(gender)
			#0%
			personalityMatchFilter = Q()

			#50% match
			if(personalityMatch == "2"):
				personalityMatchFilter = Q(userPersonalityType__contains = partnerPersonalityOne[0])&Q(userPersonalityType__contains = partnerPersonalityOne[1])|Q(userPersonalityType__contains = partnerPersonalityOne[0])&Q(userPersonalityType__contains = partnerPersonalityOne[2])|Q(userPersonalityType__contains = partnerPersonalityOne[0])&Q(userPersonalityType__contains = partnerPersonalityOne[3])|Q(userPersonalityType__contains = partnerPersonalityOne[1])&Q(userPersonalityType__contains = partnerPersonalityOne[2])|Q(userPersonalityType__contains = partnerPersonalityOne[1])&Q(userPersonalityType__contains = partnerPersonalityOne[3])|Q(userPersonalityType__contains = partnerPersonalityOne[2])&Q(userPersonalityType__contains = partnerPersonalityOne[3])
			#75%
			elif(personalityMatch == "3"):
				personalityMatchFilter = Q(userPersonalityType__contains = partnerPersonalityOne[0])&Q(userPersonalityType__contains = partnerPersonalityOne[1])&Q(userPersonalityType__contains = partnerPersonalityOne[2])| Q(userPersonalityType__contains = partnerPersonalityOne[0])&Q(userPersonalityType__contains = partnerPersonalityOne[1])&Q(userPersonalityType__contains = partnerPersonalityOne[3])| Q(userPersonalityType__contains = partnerPersonalityOne[0])&Q(userPersonalityType__contains = partnerPersonalityOne[2])&Q(userPersonalityType__contains = partnerPersonalityOne[3])| Q(userPersonalityType__contains = partnerPersonalityOne[1])&Q(userPersonalityType__contains = partnerPersonalityOne[2])&Q(userPersonalityType__contains = partnerPersonalityOne[3])
			#100%
			elif(personalityMatch =="4"):
				personalityMatch = Q(userPersonalityType=partnerPersonalityOne)

			if(filterHasPayed == "True"):
				hasPayedQuery= Q(hasUserPayed = True)
	
			if(gender==1):
				genderQuery = Q(interestedInFemale=True)
			elif(gender==2):
				genderQuery = Q(interestedInMale=True)
			elif(gender==3):
				genderQuery = Q(interestedInOther=True)


	
			if(interestedInFemale == "True" and interestedInMale=="True" and interestedInOther=="True"):
				genderQueryTwo = Q(gender=1)|Q(gender=2)|Q(gender=3)

			elif(interestedInFemale == "False" and interestedInMale=="True" and interestedInOther=="True"):
				genderQueryTwo = Q(gender=2)|Q(gender=3)

			elif(interestedInFemale == "True" and interestedInMale=="False" and interestedInOther=="True"):
				genderQueryTwo = Q(gender=1)|Q(gender=3)

			elif(interestedInFemale == "True" and interestedInMale=="True" and interestedInOther=="False"):
				genderQueryTwo = Q(gender=1)|Q(gender=2)

			elif(interestedInFemale == "True" and interestedInMale=="False" and interestedInOther=="False"):
				genderQueryTwo = Q(gender=1)
			
			elif(interestedInFemale == "False" and interestedInMale=="True" and interestedInOther=="False"):
				genderQueryTwo = Q(gender=2)
			
			elif(interestedInFemale == "False" and interestedInMale=="False" and interestedInOther=="True"):
				genderQueryTwo = Q(gender=3)


			maxAgeOfInterest = self.request.query_params.get("maxAgeOfInterest")
			if(maxAgeOfInterest == 65):
				maxAgeOfInterest = 120
			age = self.request.query_params.get("age")
			latitude = float(latitude)
			longitude = float(longitude)
			location = Point(longitude, latitude, srid=4326)
			#then user is requesting new people
			radius = float(radius) * 1/111.325
			#queryset = Personal.objects.filter(gender=gender,interestedInOther=interestedInOther,minAgeOfInterest__lte = age,maxAgeOfInterest__gte=age, age__gte=minAgeOfInterest, age__lte=maxAgeOfInterest,interestedInFemale=isFemale)
			matchedPartners = Matches.objects.filter(owner = userId).values_list("possiblePartners", flat=True)
			#queryset = Personal.objects.filter(
			#	personalityMatchFilter,
			#	genderQuery,
			#	
			#	genderQueryTwo,
			#	hasPayedQuery,
			#	~Q(id=userId),
			#
			#	
			#	#user fetching data is within the age range of the person getting gotten and vice versa
			#	minAgeOfInterest__lte = age,maxAgeOfInterest__gte=age, age__gte=minAgeOfInterest, age__lte=maxAgeOfInterest,
			#	#user fetching data is right gender for the user who is getting gotten and vice versa
			#	
			#	location__distance_lte=(location, radius)
			#	#if user has seen a person and given an opinion about them there will be 
			#	#an object in the match model where the user is the owner of the object
			#	).exclude(id__in=matchedPartners)[:25]
			queryset = Personal.objects.all()

		elif(matchesOwner is not None):
			matchedPartners = Matches.objects.filter(owner = matchesOwner).values_list("possiblePartners", flat=True)
			#matchedPartners = Matches.objects.filter(possiblePartners = matchesOwner)
			for e in matchedPartners:
				print (e)
			queryset= Matches.objects.filter(possiblePartners = matchesOwner)
			#excludeIfSeen = Personal.objects.filter(matchesOwner=userId)
			#
			#for a in excludeIfSeen:
			#	print(a)
			#print(excludeIfSeen)
		else:
			queryset= Personal.objects.all()

		return queryset
#http://127.0.0.1:8000/PersonalView/?minAgeOfInterest=18&maxAgeOfInterest=99&userId=4&age=45&personalityMatch=0&filterHasPayed=False&radius=100000000000000&longitude=75.0001&latitude=75.0001&isFemale=True&interestedInFemale=True&interestedInMale=True&userPersonality=INFJ&partnerPersonalityOne=INFJ
class ReportsView(viewsets.ModelViewSet):
	serializer_class = ReportsSerializer
#	permission_classes = (permissions.IsAuthenticated, permissions.IsOwnerOrReadOnly,)
	def get_queryset(self):
		reportedReason = self.request.query_params.get("reportedReason")
		reportedNumber = self.request.query_params.get("reportedNumber")
		if (reportedNumber is not None and reportedReason is not None):
			queryset = Reports.objects.filter(reportedNumber=reportedNumber, reportedReason=reportedReason)
	
		elif (reportedNumber is not None):
			queryset = Reports.objects.filter(reportedNumber=reportedNumber)
		elif (reportedReason is not None):
			queryset = Reports.objects.filter(reportedReason=reportedReason)
		else:
			queryset= Reports.objects.all()
		return queryset


def send_push_message(token, message, extra=None):
	try:
		response = PushClient().publish(
			PushMessage(to=token,
						body=message,
						
						data=extra))
	except PushServerError as exc:
		# Encountered some likely formatting/validation error.
		rollbar.report_exc_info(
			extra_data={
				'token': token,
				'message': message,
				'extra': extra,
				'errors': exc.errors,
				'response_data': exc.response_data,
			})
		raise
	except (ConnectionError, HTTPError) as exc:
		# Encountered some Connection or HTTP error - retry a few times in
		# case it is transient.
		rollbar.report_exc_info(
			extra_data={'token': token, 'message': message, 'extra': extra})
		raise self.retry(exc=exc)

	try:
		# We got a response back, but we don't know whether it's an error yet.
		# This call raises errors so we can handle them with normal exception
		# flows.
		response.validate_response()
	except DeviceNotRegisteredError:
		# Mark the push token as inactive
		from notifications.models import PushToken
		PushToken.objects.filter(token=token).update(active=False)
	except PushTicketError as exc:
		# Encountered some other per-notification error.
		rollbar.report_exc_info(
			extra_data={
				'token': token,
				'message': message,
				'extra': extra,
				'push_response': exc.push_response._asdict(),
			})
		raise self.retry(exc=exc)

class ExpoPushTokenView(viewsets.ModelViewSet):
	serializer_class = ExpoPushTokenSerializer
	def get_queryset(self):
		owner = self.request.query_params.get('owner')
		if owner is not None:
			queryset = ExpoPushToken.objects.filter(owner=owner)
			return queryset
		else:
			queryset = ExpoPushToken.objects.all()
			return queryset

class PremiumMatchView(viewsets.ModelViewSet):
	serializer_class = PremiumMatchesSerializer

	def get_queryset(self):
		userId = self.request.query_params.get("userId")
		if(userId is not None):
			queryset = Matches.objects.filter(possiblePartners=userId)
			return queryset
		else:
			queryset = Matches.objects.all()
			return queryset

class PaymentView(viewsets.ModelViewSet):
	queryset = Payment.objects.all()
	serializer_class = PaymentSerializer
	#permission_classes = (permissions.IsAuthenticated, permissions.IsOwnerOrReadOnly,)


class MatchesView(viewsets.ModelViewSet):
	queryset = Matches.objects.all()
	serializer_class = MatchesSerializer
	#permission_classes = (permissions.IsAuthenticated, permissions.IsOwnerOrReadOnly,)
	lookup_field = 'owner'
	def create(self, request):
		owner = request.data.get("owner")
		possiblePartners = request.data.get("possiblePartners")
		ownerLikesPossiblePartner = request.data.get("ownerLikesPossiblePartner")
		possiblePartnerHasViewedOwnersOpinion = request.data.get("possiblePartnerHasViewedOwnersOpinion")
		if(possiblePartnerHasViewedOwnersOpinion ==True):
			Room.objects.create(userOne = owner, userTwo=possiblePartners)
			userDataForChat = Room.objects.filter(Q(userOne=owner, userTwo=possiblePartners)|Q(userOne=possiblePartners,userTwo=owner))
			for token in ExpoPushToken.objects.filter(owner=owner):
				send_push_message(token.token, "Match", {"userData":userDataForChat})
			for token in ExpoPushToken.objects.filter(owner=ownerLikesPossiblePartner):
				send_push_message(token.token, "Match", {"userData":userDataForChat})
			return super().create(request)
		else:		
			#if user doing create "likes" the possiblePartner
			if(ownerLikesPossiblePartner == True):
				query = Matches.objects.filter(owner=possiblePartners, possiblePartners=owner)
				#check if possiblePartner has an opinion about  user already
				if(len(query)>=1):
					#check if "likes" user 
					if( query[0].ownerLikesPossiblePartner==True):
						Room.objects.create(userOne = owner, userTwo=possiblePartners)

						Matches.objects.create(owner=owner,opinion=opinion, possiblePartners=possiblePartners)
						####	SEND NOTIFICATION THAT THEY MATCHED 

						userDataForChat = Room.objects.filter(Q(userOne=owner, userTwo=possiblePartners)|Q(userOne=possiblePartners,userTwo=owner))
						for token in ExpoPushToken.objects.filter(owner=owner):
							send_push_message(token.token, "Match", {"userData":userDataForChat})
						for token in ExpoPushToken.objects.filter(owner=ownerLikesPossiblePartner):
							send_push_message(token.token, "Match", {"userData":userDataForChat})
						return super().create(request)
					else:
						return super().create(request)
				else:
					return super().create(request)
			else:
				return super().create(request)

class RoomView(viewsets.ModelViewSet):
	serializer_class = RoomSerializer
	def get_queryset(self):
		reciever = self.request.query_params.get("reciever")
		sender = self.request.query_params.get("sender")
		if (reciever is not None):
			#a specific chat room is requested
			queryset = Room.objects.filter(Q(userOne=sender)|Q(userOne=reciever), Q(userTwo=reciever)|Q(userTwo=sender))
#queryset = Message.objects.filter(Q(room__userOne=sender)|Q(room__userOne=reciever)&Q(room__userTwo=sender)|Q(room__userTwo=reciever))
		elif(sender is not None):
			#all of a users chats are requested
			#queryset 
			queryset = Room.objects.filter(Q(userOne=sender)|Q(userTwo=sender))
		else:
			#probably will not see use after development
			queryset = Room.objects.all()
		return queryset	

class ImagesView(viewsets.ModelViewSet):
	serializer_class = ImagesSerializer
	def get_queryset(self):
		owner = self.request.query_params.get("owner")
		if owner is not None:
			queryset = Images.objects.filter(owner=owner)
			return queryset
		else:
			queryset = Images.objects.all()
			return queryset

	#	permission_classes = (permissions.IsAuthenticated, permissions.IsOwnerOrReadOnly,)
	def create(self,request):
		owner = request.data.get("owner")
		ownerImages = Images.objects.filter(owner=owner).count()
		if(ownerImages>=5):
			return HttpResponseForbidden() 
		else:
			return super().create(request)


class MessageView(viewsets.ModelViewSet):
	serializer_class = MessageSerializer
#	permission_classes = (permissions.IsAuthenticated, permissions.IsOwnerOrReadOnly,)
	def get_queryset(self):
		room = self.request.query_params.get("room")
		sender = self.request.query_params.get("sender")
		if(room is not None):
			queryset = Message.objects.filter(sender=sender, room=room )
		elif(sender is not None):
			queryset = Message.objects.filter(sender=sender)
		else:
			queryset = Message.objects.all()
		return queryset


	def create(self,request):
		sender = request.data.get("sender")
		room = request.data.get("room")
		message = request.data.get("message")
		reciever = request.data.get("reciever")
		recieverToken = ExpoPushToken.objects.filter(owner=reciever)
		timestamp = request.data.get("timestamp")
		for token in ExpoPushToken.objects.filter(owner=reciever):
			send_push_message(token.token, "Message!", {"sender":sender,"room":room, "message":message,"timestamp":timestamp})
		return super().create(request)

