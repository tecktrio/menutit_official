
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import AccessToken
import jwt
from django.conf import settings
from api.models import Users

def isUser(request):
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    print("hello")

    if auth_header and auth_header.startswith('Token '):
        # Extract the token
        token = auth_header.split(' ')[1]
    else:
        # No or invalid authorization header
        return False
    ak = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.SIMPLE_JWT['ALGORITHM']])
    if not ak:
        return JsonResponse({'Token expired'})
    print('ak', ak)
    user_name = ak['user_id']
    # password = ak['password']
    user = Users.objects.filter(id = user_name).first()
    if user:
        # if user.password == password:
        return user
       
    else:
        return False