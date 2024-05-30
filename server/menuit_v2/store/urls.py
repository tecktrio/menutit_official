
from django.shortcuts import render
from django.urls import path, include
  
from .views import ManageProducts, ManageDivision,  ManageCategories , UserLogin, UserRegister, ManageStore
from .views import GetAllStore
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('product',view=ManageProducts.as_view()),
    path('category',view=ManageCategories.as_view()),
    path('storemanage',view=ManageStore.as_view()),
    path('division',view=ManageDivision.as_view()),
    path('allstore',view=GetAllStore.as_view()),
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

