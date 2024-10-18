from rest_framework import serializers

class UserDataSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    login = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    # Diğer alanları ekleyin
