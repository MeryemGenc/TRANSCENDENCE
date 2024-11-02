from rest_framework import serializers
from authapp.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'  # veya istediğin alanları listeleyebilirsin
