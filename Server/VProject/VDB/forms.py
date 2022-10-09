from django.forms import ModelForm
from VDB import models

class MessageForm(ModelForm):
	class meta: 
		model = models.Message

class QuizForm(ModelForm):
	class meta: 
		model = models.Quiz

class MatchesForm(ModelForm):
	class meta: 
		model = models.Matches


class PersonalForm(ModelForm):
	class meta: 
		model = models.Personal

class LoginForm(ModelForm):
	class meta: 
		model = models.Login


class Extraversion(serializers.ModelSerializer):

	class Meta: 
		model = models.Extraversion




class Conscientious(serializers.ModelSerializer):

	class Meta: 
		model = models.Conscientious


class Neurotic(serializers.ModelSerializer):

	class Meta: 
		model = models.Neurotic


class Openness(serializers.ModelSerializer):

	class Meta: 
		model = models.Openness



class Agreeable(serializers.ModelSerializer):

	class Meta: 
		model = models.Agreeable


class PartnerExtraversion(serializers.ModelSerializer):

	class Meta: 
		model = models.PartnerExtraversion



class PartnerConscientious(serializers.ModelSerializer):
	class Meta: 
		model = models.PartnerConscientious


class PartnerNeurotic(serializers.ModelSerializer):
	class Meta: 
		model = models.PartnerNeurotic


class PartnerOpenness(serializers.ModelSerializer):
	class Meta: 
		model = models.PartnerOpenness


class PartnerAgreeable(serializers.ModelSerializer):
	class Meta: 
		model = models.PartnerAgreeable
