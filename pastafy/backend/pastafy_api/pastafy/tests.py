from django.test import TestCase
from .models import Ingredient


class TodoModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Ingredient.objects.create(ingredient='ginger')
        Ingredient.objects.create(description='a description here')

    def test_title_content(self):
        ginger = Ingredient.objects.get(id=1)
        expected_object_name = f'{ginger.ingredient}'
        self.assertEquals(expected_object_name, 'ginger')

    def test_description_content(self):
        ginger = Ingredient.objects.get(id=2)
        expected_object_name = f'{ginger.description}'
        self.assertEquals(expected_object_name, 'a description here')

# Create your tests here.
