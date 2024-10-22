import requests
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile  # Modeli ekleyin

class AuthRedirectView(APIView):
    def get(self, request):
        code = request.GET.get('code')
        if code:
            token_url = 'https://api.intra.42.fr/oauth/token'
            data = {
                'grant_type': 'authorization_code',
                'client_id': settings.CLIENT_ID,
                'client_secret': settings.CLIENT_SECRET,
                'redirect_uri': 'http://127.0.0.1:8000/authapp/auth/redirect/',
                'code': code,
            }

            token_response = requests.post(token_url, data=data)
            if token_response.status_code != 200:
                return Response({'error': 'Token alınamadı'}, status=status.HTTP_401_UNAUTHORIZED)

            access_token = token_response.json().get('access_token')
            if not access_token:
                return Response({'error': 'Erişim token\'ı bulunamadı'}, status=status.HTTP_401_UNAUTHORIZED)

            profile_url = 'https://api.intra.42.fr/v2/me'
            headers = {'Authorization': f'Bearer {access_token}'}
            profile_response = requests.get(profile_url, headers=headers)

            if profile_response.status_code != 200:
                return Response({'error': 'Veri alınamadı'}, status=status.HTTP_401_UNAUTHORIZED)

            # Kullanıcı profil verisini al
            user_data = profile_response.json()

            # Veritabanına kaydet
            user_profile, created = UserProfile.objects.update_or_create(
                user_id=user_data['id'],
                defaults={
                    'email': user_data['email'],
                    'login': user_data['login'],
                    'first_name': user_data['first_name'],
                    'last_name': user_data['last_name'],
                    'usual_full_name': user_data['usual_full_name'],
                    'url': user_data['url'],
                    'phone': user_data.get('phone', None),
                    'display_name': user_data.get('displayname', None),
                    'kind': user_data.get('kind', 'student'),  # varsayılan değer
                    'image_link': user_data['image']['link']
                }
            )

            return Response(user_profile, status=status.HTTP_200_OK)

        auth_url = f"https://api.intra.42.fr/oauth/authorize?client_id={settings.CLIENT_ID}&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fauthapp%2Fauth%2Fredirect%2F&response_type=code"
        return redirect(auth_url)
