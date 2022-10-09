from django.db import models
from django.forms import ModelForm
from django.db.models import Q

from django.contrib.auth.models import User
from django.contrib.gis.db import models
from django.core.exceptions import ValidationError
#from django.utils.encoding import python_2_unicode_compatible
from django.utils import timezone
from rest_framework.authtoken.models import Token

def get_image_path(instance, filename):
	return os.path.join('photos', str(instance.id), filename)

class Personal(models.Model):
	owner = models.ForeignKey(Token, on_delete=models.CASCADE, related_name = 'Personal')
	age = models.IntegerField(blank=True,default=-99)
	#Remove age and transition system into only using birthday to calculate age
	birthday = models.CharField(blank=True,max_length=20, default="")
	name = models.CharField(blank=True,max_length=100, default="")

	minAgeOfInterest = models.IntegerField(blank=True,default=18)
	maxAgeOfInterest = models.IntegerField(blank=True,default=65)

	aboutMe = models.CharField(blank=True,max_length=1000, default="")

	interestedInMale = models.BooleanField(default=False)
	interestedInFemale = models.BooleanField(default=False)
	interestedInOther = models.BooleanField(default=False)

	isFemale = models.BooleanField(default=False)
	#0: default indicates value not set, 1: male, 2: female, 3:other
	gender = models.IntegerField(blank = True, default=0,null=True)
	
	#radius is in km
	radius = models.IntegerField(blank=True,default=-99,null=True)

	"""
	{
	 
		"location": {
			"type": "Point",
			"coordinates": [
				75.0001,      ##lat
				75.0001		  ##long
			]
		}
	}
	"""	
	location = models.PointField(blank=True, srid=4326)

	dateOfLastPayment = models.IntegerField(default=-99,null=True)
#4 is 100% ,3 is 75%, 2 is 50%, 1 is 0%
	personalityMatchFilter = models.IntegerField(blank = True, default=0)
	userExtraversion = models.IntegerField(blank=True, default=0)
	userConscientious = models.IntegerField(blank=True, default=0)
	userNeurotic = models.IntegerField(blank=True, default=0)
	userAgreeable= models.IntegerField(blank=True, default=0)
	userOpenness = models.IntegerField(blank=True, default=0)

	userExtraversionQuestionAnswered = models.IntegerField(blank=True, default=0)
	userConscientiousQuestionAnswered = models.IntegerField(blank=True, default=0)
	userNeuroticQuestionAnswered = models.IntegerField(blank=True, default=0)
	userAgreeableQuestionAnswered= models.IntegerField(blank=True, default=0)
	userOpennessQuestionAnswered = models.IntegerField(blank=True, default=0)

	partnerExtraversionQuestionAnswered = models.IntegerField(blank=True, default=0)
	partnerConscientiousQuestionAnswered = models.IntegerField(blank=True, default=0)
	partnerNeuroticQuestionAnswered = models.IntegerField(blank=True, default=0)
	partnerAgreeableQuestionAnswered= models.IntegerField(blank=True, default=0)
	partnerOpennessQuestionAnswered = models.IntegerField(blank=True, default=0)

	partnerExtraversion = models.IntegerField(blank=True, default=0)
	partnerConscientious = models.IntegerField(blank=True, default=0)
	partnerNeurotic = models.IntegerField(blank=True, default=0)
	partnerAgreeable= models.IntegerField(blank=True, default=0)
	partnerOpenness = models.IntegerField(blank=True, default=0)


	#have kids = 1 want kids = 2 mightWantKids = 10 I_DONT_KNOW_IF_I_WANT_CHILDREN = 2
	personalValues = models.CharField(blank=True,max_length=50, default="")
	token = models.CharField(max_length=60,blank=True)

class Payment(models.Model):
	owner = models.ForeignKey(Personal, related_name='Payment', on_delete=models.CASCADE)
	dateOfPayment = models.DateTimeField(auto_now_add=True)

class Legal(models.Model):
	owner = models.ForeignKey(Personal, related_name='Legal', on_delete=models.CASCADE)
	dateOfAgreed = models.DateTimeField(auto_now_add=True)


class ExpoPushToken(models.Model):
	owner = models.ForeignKey(Personal, related_name='ExpoPushToken', on_delete=models.CASCADE)
	token = models.CharField(max_length=60)

class Images(models.Model):
	owner = models.ForeignKey(Personal, related_name='Images', on_delete=models.CASCADE)
	image1 = models.ImageField(upload_to='photos/',null=True)

	
class Reports(models.Model):
	owner = models.ForeignKey(Personal, related_name='reportsOwner', on_delete=models.CASCADE)
	reportedReason = models.CharField(max_length=500, default="")
	dateOfReport = models.DateTimeField(auto_now_add=True)
	reportedUser = models.ForeignKey(Personal, related_name='reportedUser', on_delete=models.CASCADE)



class Matches(models.Model):
	owner = models.ForeignKey(Personal, related_name='matchesOwner', on_delete=models.CASCADE)
	possiblePartners = models.ForeignKey(Personal, related_name='possiblePartner', on_delete=models.CASCADE)
	TimeOfMatch = models.DateTimeField(auto_now_add=True)
	ownerLikesPossiblePartner = models.BooleanField()
	#premiumFunction
	#0 = no opinion yet, 1 = dislike, 2= like
	possiblePartnerHasViewedOwnersOpinion = models.IntegerField(default=0)


def validate_message_content(content):
	if content is None or content == "" or content.isspace():
		raise ValidationError(
			'Content is empty/invalid',
			code='invalid',
			params={'content': content},
		)


class Room(models.Model):
	userOne = models.ForeignKey(Personal, on_delete=models.CASCADE, related_name = 'userOne')
	userTwo = models.ForeignKey(Personal, on_delete=models.CASCADE, related_name = 'userTwo')
	timestamp = models.DateTimeField(auto_now_add=True)



class Message(models.Model):
	sender = models.ForeignKey(Personal, on_delete=models.CASCADE, related_name = 'sender')
	message = models.TextField(max_length=1000)
	room = models.ForeignKey(Room, related_name="Message", on_delete=models.CASCADE)
	timestamp = models.CharField(max_length=18)
	reciever = models.ForeignKey(Personal, on_delete=models.CASCADE, related_name = 'reciever')
