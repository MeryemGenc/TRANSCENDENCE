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
            # Manuel olarak 'is_authenticated' özelliğini ekliyoruz
            user.is_authenticated = True  # Kullanıcıyı aktif olarak işaretle
            return user
        except UserProfile.DoesNotExist:
            raise AuthenticationFailed("User not found")

class ProtectedView(APIView):
    authentication_classes = [CustomJWTAuthentication]  # JWT ile kimlik doğrulama
    permission_classes = [IsAuthenticated]  # Kullanıcı giriş yapmış olmalı

    def get(self, request):
        user = request.user
        return Response({
            'message': 'Erişim başarılı',
            'user_id': user.id,
            'username': user.login,
            'email': user.email
            
        })
