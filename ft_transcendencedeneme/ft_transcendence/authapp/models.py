from django.db import models

class UserProfile(models.Model):
    id = models.BigIntegerField(primary_key=True)  # 42 API'deki id değeri
    email = models.EmailField(max_length=255)      # Kullanıcı e-postası
    login = models.CharField(max_length=100)       # Kullanıcı adı
    first_name = models.CharField(max_length=100)  # Kullanıcının ilk adı
    last_name = models.CharField(max_length=100)   # Kullanıcının soyadı
    usual_full_name = models.CharField(max_length=200)  # Tam adı
    url = models.URLField()                        # Kullanıcı URL'si
    phone = models.CharField(max_length=50, blank=True, null=True)  # Kullanıcı telefon numarası
    displayname = models.CharField(max_length=200, blank=True, null=True)  # Kullanıcı görüntü adı
    kind = models.CharField(max_length=50, blank=True, null=True)  # Kullanıcı türü (örn: öğrenci)
    image_link = models.URLField(blank=True, null=True)  # Profil resmi linki
    large_image = models.URLField(blank=True, null=True)  # Büyük boyutlu profil resmi linki
    medium_image = models.URLField(blank=True, null=True)  # Orta boyutlu profil resmi linki
    small_image = models.URLField(blank=True, null=True)  # Küçük boyutlu profil resmi linki
    micro_image = models.URLField(blank=True, null=True)  # Mikro boyutlu profil resmi linki

    def __str__(self):
        return self.usual_full_name  # Modelin string temsilini döndür
