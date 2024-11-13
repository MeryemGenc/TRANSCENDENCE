from django.urls import path
from .views import index
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', index, name='home'),
    path('dashboard', index, name='dashboard'),
    path('login', index, name='login'),
    path('games', index, name='games'),
    path('settings', index, name='settings'),
    path('authapp/', include('authapp.urls')),
    path('api/', include('UserApi.urls')),
    path('api/user/', include('UserChangedApi.urls')),
]
