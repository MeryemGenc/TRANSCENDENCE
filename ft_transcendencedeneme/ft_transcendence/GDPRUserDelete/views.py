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

class DeleteUserProfileView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        # Profilin silinmesi
        try:
            user.delete()  # Kullanıcıyı veritabanından sil
            return Response({
                "message": "Kullanıcı profili başarıyla silindi"
            }, status=204)
        except Exception as e:
            return Response({
                "error": str(e)
            }, status=400)
