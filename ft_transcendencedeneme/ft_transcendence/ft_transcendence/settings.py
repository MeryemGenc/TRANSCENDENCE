from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-^j4+obt#jzm@qhph*2@dlj^oc$%3-3qbn92uscyhp&&ey1r!!+'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# 42 API kimlik bilgileri
CLIENT_ID = 'u-s4t2ud-0a22e09e6c53ae440cbd9773d652675ccab942984d6338f8c98f6dd4e6e07540'
CLIENT_SECRET = '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'
REDIRECT_URI = 'http://127.0.0.1:8000/authapp/auth/redirect/'

# JWT Authentication settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# settings.py
# rest_framework_simplejwt ayarları
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',  # UserProfile modelinizdeki ID alanını kullanıyoruz
    'USER_ID_CLAIM': 'user_id',
}





# Application definition

INSTALLED_APPS = [
    'project',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'authapp',
    'rest_framework_simplejwt',  # JWT desteği
    'UserApi',
    'corsheaders',
    'UserChangedApi',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:8000',
    'http://localhost:8000',
]

CORS_ALLOW_CREDENTIALS = True


ROOT_URLCONF = 'ft_transcendence.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Templates klasörünü burada tanımla
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ft_transcendence.wsgi.application'


# Database settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'transcendence',
        'USER': 'ctoptas',
        'PASSWORD': '2001',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

STATICFILES_DIRS = [
    BASE_DIR / "static",  # Proje düzeyinde statik dosyaların bulunduğu klasör
]

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# static dosyaların toplanacağı yer (prodüksiyon için)
STATIC_ROOT = BASE_DIR / "staticfiles"

# settings.py

# Çerezlerin HTTP üzerinden gönderilebilmesi için Secure özelliğini kapatıyoruz
SESSION_COOKIE_SECURE = False  # HTTPS gereksiz olduğu için False yapıyoruz
CSRF_COOKIE_SECURE = False  # HTTPS gereksiz olduğu için False yapıyoruz

# SameSite ayarını Strict veya Lax olarak bırakabilirsiniz
SESSION_COOKIE_SAMESITE = 'Lax'  # SameSite'ı Lax olarak bırakmak genellikle yeterlidir
CSRF_COOKIE_SAMESITE = 'Lax'  # SameSite'ı Lax olarak bırakmak genellikle yeterlidir


