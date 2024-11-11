from django.db import models

class UserProfile(models.Model):
    id = models.BigIntegerField(primary_key=True)  # 42 API'den gelen id'yi primary key olarak kullan
    email = models.EmailField(max_length=255)
    login = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    usual_full_name = models.CharField(max_length=200)
    url = models.URLField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    displayname = models.CharField(max_length=200, blank=True, null=True)
    kind = models.CharField(max_length=50, blank=True, null=True)
    image_link = models.URLField(blank=True, null=True)
    large_image = models.URLField(blank=True, null=True)
    medium_image = models.URLField(blank=True, null=True)
    small_image = models.URLField(blank=True, null=True)
    micro_image = models.URLField(blank=True, null=True)

    # API'den gelmeyen özel alanlar
    nickname = models.CharField(max_length=100, blank=True, null=True)
    avatar_path = models.CharField(max_length=255, blank=True, null=True, default='./static/images/kiz.png')
    language_settings = models.CharField(max_length=10, blank=True, null=True ,default='tr')   # ISO dil kodu için örnek: 'en', 'fr' gibi.

    def __str__(self):
        return self.usual_full_name
