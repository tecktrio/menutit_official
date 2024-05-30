from django.contrib import admin

from store.models import Users,  Stores, Categories, Advertisments, Division, Products

# Register your models here.

admin.site.register([Users, Stores, Categories, Advertisments, Division, Products])