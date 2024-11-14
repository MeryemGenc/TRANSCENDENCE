from django.urls import path
from .views import DeleteUserProfileView

urlpatterns = [
    # Diğer URL'ler...
    path('deletegdpr/', DeleteUserProfileView.as_view(), name='delete_user_profile'),
]
