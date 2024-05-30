from rest_framework import status
from functools import wraps
from rest_framework.response import Response

def check_header_key():
    """
    Custom decorator to check for a specific key in request header.
    """
#   def decorator():
    def only_allow_post(view_func):
        """
        Custom decorator to allow only POST requests.
        """
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if request.method != 'POST':
                return Response({'error': 'Only POST method allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return only_allow_post
#   return decorator