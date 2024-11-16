from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from authapp.models import UserProfile

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token.get("user_id")
        if not user_id:
            raise AuthenticationFailed("Token contains no user_id claim")
        try:
            user = UserProfile.objects.get(id=user_id)
            user.is_authenticated = True
            return user
        except UserProfile.DoesNotExist:
            raise AuthenticationFailed("User not found")

class ProtectedView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'message': 'Erişim başarılı',
            'user_id': user.id,
            'username': user.login,
            'email': user.email,
            'nickname': user.nickname,
            'language_settings': user.language_settings,  # ISO dil kodu (örneğin, 'tr' veya 'en')
            'medium_image': user.medium_image
        })
