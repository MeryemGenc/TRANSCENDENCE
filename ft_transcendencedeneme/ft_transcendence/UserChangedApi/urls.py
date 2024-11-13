from django.urls import path
from .views import UpdateUserProfileView

urlpatterns = [
    path('update-profile/', UpdateUserProfileView.as_view(), name='update-profile')
]
