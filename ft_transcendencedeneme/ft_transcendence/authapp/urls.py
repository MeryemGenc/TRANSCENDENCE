from django.urls import path
from .views import AuthRedirectView

urlpatterns = [
    path('auth/redirect/', AuthRedirectView.as_view(), name='auth_redirect_and_profile'),
]
