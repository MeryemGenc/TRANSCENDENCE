# authapp/views.py

from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from django.conf import settings

# Yetkilendirme Görünümü
def authorize(request):
    return redirect(f"https://api.intra.42.fr/oauth/authorize?client_id={settings.CLIENT_ID}&redirect_uri={settings.REDIRECT_URI}&response_type=code")

# Callback Görünümü
def callback(request):
    code = request.GET.get('code')  # API'den gelen code
    token_url = "https://api.intra.42.fr/oauth/token"
    
    # Token almak için istek yap
    response = requests.post(token_url, data={
        'grant_type': 'authorization_code',
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET,
        'redirect_uri': settings.REDIRECT_URI,
        'code': code,
    })

    if response.status_code == 200:
        token_data = response.json()
        access_token = token_data.get('access_token')
        request.session['access_token'] = access_token  # Access token'ı oturuma kaydet
        return redirect('user-data')  # Kullanıcı verilerini görüntülemek için yönlendir
    else:
        error_data = response.json()
        return render(request, 'authapp/error.html', {'error': error_data})  # Hata sayfasına yönlendir

# Kullanıcı Verilerini Görüntüleme
class UserDataView(APIView):
    def get(self, request, *args, **kwargs):
        access_token = request.session.get('access_token')  # Oturumdan access token'ı al

        if not access_token:
            return Response({"error": "Access token not found."}, status=400)

        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get("https://api.intra.42.fr/v2/me", headers=headers)

        if response.status_code == 200:
            user_data = response.json()
            return Response(user_data)  # Kullanıcı verilerini döndür
        else:
            return Response({"error": "Failed to retrieve user data."}, status=response.status_code)
