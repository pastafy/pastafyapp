from rest_framework import serializers
from .models import Ingredient, PredictionEngine


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'ingredient',
            'description',
        )
        model = Ingredient

class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'user_selections',
            'pasta',
            "extra_ingredients"
        )
        model = PredictionEngine