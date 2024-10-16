from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='home'),
    path('dashboard', index, name='dashboard'),
    path('login', index, name='login'),
    path('games', index, name='games'),
    path('settings', index, name='settings'),
    # Diğer yönlendirmeleri buraya ekleyebilirsin
]
