from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import AuthRedirectView

urlpatterns = [
    path('auth/redirect/', AuthRedirectView.as_view(), name='auth_redirect'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', AuthRedirectView.as_view(), name='root-auth'),
    path('authapp/auth/redirect/', AuthRedirectView.as_view(), name='auth-redirect'),
]
