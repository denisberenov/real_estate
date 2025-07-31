# myproject/middleware.py
from django.conf import settings
from django.http import JsonResponse

class SimpleTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.headers.get('X-API-TOKEN')
        if token != settings.API_SECRET_TOKEN:
            return JsonResponse({'detail': 'Unauthorized'}, status=401)
        return self.get_response(request)
