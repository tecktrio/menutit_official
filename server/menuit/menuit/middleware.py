# myapp/middleware.py

# from django.http import JsonResponse
# from rest_framework_simplejwt.tokens import AccessToken
from django.conf import settings

from api.models import Users

class Verify:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        return response
