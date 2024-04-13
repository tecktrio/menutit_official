from django.test import TestCase
import jwt
# from server.menuit.api.views import JWT

# Create your tests here.

payload = {
    'username': "username",
    'password': "password"
}
# Encode the payload to generate a JWT token
token = jwt.encode(payload, "settings.JWT_SECRET_KEY", algorithm='HS256')
        
print(token)