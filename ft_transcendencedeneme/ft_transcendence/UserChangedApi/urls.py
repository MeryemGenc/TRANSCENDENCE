from django.urls import path
from .views import UpdateUserProfileView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('update-profile/', UpdateUserProfileView.as_view(), name='update-profile')
]
