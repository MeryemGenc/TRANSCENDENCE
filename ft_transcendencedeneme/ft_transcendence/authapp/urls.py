from django.urls import path
from .views import AuthRedirectView  # Sadece AuthRedirectView'i bırakın

urlpatterns = [
    path('auth/redirect/', AuthRedirectView.as_view(), name='auth_redirect'),
]
