import requests
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile

class AuthRedirectView(APIView):
    def get(self, request):
        code = request.GET.get('code')

        if code:
            token_url = 'https://api.intra.42.fr/oauth/token'
            data = {
                'grant_type': 'authorization_code',
                'client_id': settings.CLIENT_ID,
                'client_secret': settings.CLIENT_SECRET,
                'redirect_uri': settings.REDIRECT_URI,
                'code': code,
            }

            try:
                token_response = requests.post(token_url, data=data)
                token_response.raise_for_status()
            except requests.RequestException as e:
                return Response({'error': 'Token alınamadı', 'details': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

            access_token = token_response.json().get('access_token')
            if not access_token:
                return Response({'error': 'Erişim token\'ı bulunamadı'}, status=status.HTTP_401_UNAUTHORIZED)

            profile_url = 'https://api.intra.42.fr/v2/me'
            headers = {'Authorization': f'Bearer {access_token}'}
            try:
                profile_response = requests.get(profile_url, headers=headers)
                profile_response.raise_for_status()
            except requests.RequestException as e:
                return Response({'error': 'Kullanıcı verisi alınamadı', 'details': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

            user_data = profile_response.json()

            user_profile, created = UserProfile.objects.update_or_create(
                id=user_data['id'],
                defaults={
                    'email': user_data.get('email'),
                    'login': user_data.get('login'),
                    'first_name': user_data.get('first_name'),
                    'last_name': user_data.get('last_name'),
                    'usual_full_name': user_data.get('usual_full_name'),
                    'url': user_data.get('url'),
                    'phone': user_data.get('phone', None),
                    'displayname': user_data.get('displayname', None),
                    'kind': user_data.get('kind', None),
                    'image_link': user_data.get('image', {}).get('link', None),
                    'large_image': user_data.get('image', {}).get('versions', {}).get('large', None),
                    'medium_image': user_data.get('image', {}).get('versions', {}).get('medium', None),
                    'small_image': user_data.get('image', {}).get('versions', {}).get('small', None),
                    'micro_image': user_data.get('image', {}).get('versions', {}).get('micro', None),
                }
            )

            refresh = RefreshToken.for_user(user_profile)
            access_token = str(refresh.access_token)

            response = Response({'access_token': access_token}, status=status.HTTP_200_OK)
            response = redirect('dashboard')
            response.set_cookie('access_token', access_token, max_age=3600, httponly=False ,secure=True)
            
            

            return response
            

        auth_url = f"https://api.intra.42.fr/oauth/authorize?client_id={settings.CLIENT_ID}&redirect_uri={settings.REDIRECT_URI}&response_type=code"
        return redirect(auth_url)
