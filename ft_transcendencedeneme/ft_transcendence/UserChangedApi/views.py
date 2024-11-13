from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from authapp.models import UserProfile  # authapp'teki modeli kullanıyoruz

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

class UpdateUserProfileView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        # Gelen veriyi UserProfile modelinde güncelle
        user.nickname = data.get("nickname", user.nickname)
        user.avatar_path = data.get("avatar_path", user.avatar_path)
        user.language_settings = data.get("language_settings", user.language_settings)
        user.save()

        return Response({
            "message": "Kullanıcı bilgileri güncellendi",
            "nickname": user.nickname,
            "avatar_path": user.avatar_path,
            "language_settings": user.language_settings
        })
