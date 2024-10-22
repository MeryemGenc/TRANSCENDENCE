from rest_framework import serializers
from .models import UserProfile  # UserProfile modelinizi burada import edin

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'  # veya istediğiniz alanları belirtin
