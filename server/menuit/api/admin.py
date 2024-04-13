from django.contrib import admin

from . models import Advertisments, Categories, Division, Products, Stores, Users

# Register your models here.
admin.site.register(Products)
admin.site.register(Users)
admin.site.register(Stores)
admin.site.register(Categories)
admin.site.register(Division)
admin.site.register(Advertisments)