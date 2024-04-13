from django.test import TestCase

# Create your tests here.
from django.urls import path
from .views import ManageProducts, ManageDivision,ManageProfile,ManageUserStore,  ManageCategories , UserLogin, UserRegister, ManageStore

# handles all the routings for the shop owners
user_urlpatterns = [
    path('user/login',view=UserLogin.as_view()),
    path('user/register',view=UserRegister.as_view()),
    path('user/profile',view=ManageProfile.as_view()),
    path('user/stores',view=ManageUserStore.as_view()),
]
# handles all the routing for the store management
store_urlpatterns = [
    path('store/product',view=ManageProducts.as_view()),
    path('store/category',view=ManageCategories.as_view()),
    path('store/manage',view=ManageStore.as_view()),
    path('store/division',view=ManageDivision.as_view()),
]
# Adding all the urlpatterns into a single list
urlpatterns = store_urlpatterns + user_urlpatterns 

