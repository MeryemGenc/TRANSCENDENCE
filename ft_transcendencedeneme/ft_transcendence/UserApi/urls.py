from django.urls import path
from UserApi.views import UserProfileList

urlpatterns = [
    path('users/', UserProfileList.as_view(), name='userprofile-list'),
]
