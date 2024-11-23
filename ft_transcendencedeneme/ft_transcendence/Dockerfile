# Python imajını kullan
FROM python:3.11-slim

# Çalışma dizini oluştur
WORKDIR /app

# Gereksinim dosyasını kopyala
COPY requirements.txt /app/
COPY .env /app/.env
COPY static /app/static
COPY . /app/
RUN mkdir -p /app/static /app/staticfiles

# Gereksinim için gerekli derleyici ve başlık dosyalarını yükleyin
RUN apt-get update && apt-get install -y gcc

# Gereksinimleri yükle
RUN pip install --no-cache-dir -r requirements.txt
RUN python manage.py collectstatic --noinput

# Dizin izinlerini ayarla
RUN chmod -R 755 /app/staticfiles
RUN chmod -R 755 /app/static

# Gunicorn'u başlatmak için gerekli komutu belirle
CMD ["gunicorn", "ft_transcendence.wsgi:application", "--bind", "0.0.0.0:8000"]