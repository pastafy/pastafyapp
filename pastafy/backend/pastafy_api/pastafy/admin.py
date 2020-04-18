from django.contrib import admin

from .models import Ingredient, PredictionEngine

admin.site.register(Ingredient)
admin.site.register(PredictionEngine)

# Register your models here.
