from rest_framework import generics
from authapp.models import UserProfile
from UserApi.serializers import UserProfileSerializer

class UserProfileList(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
