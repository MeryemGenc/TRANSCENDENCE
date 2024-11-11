from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import AuthRedirectView

urlpatterns = [
    path('auth/redirect/', AuthRedirectView.as_view(), name='auth_redirect'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token yenileme endpoint'i
]
