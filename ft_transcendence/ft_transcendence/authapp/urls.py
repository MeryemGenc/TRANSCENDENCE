from django.urls import path
from .views import authorize, callback, UserDataView

urlpatterns = [
    path('authorize/', authorize, name='authorize'),
    path('callback/', callback, name='callback'),
    path('user-data/', UserDataView.as_view(), name='user-data'),
]
