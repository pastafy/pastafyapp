from rest_framework import generics
from .models import Ingredient, PredictionEngine
from rest_framework.views import APIView
import json
from .serializers import IngredientSerializer, PredictionSerializer
from django.http import HttpResponse
from rest_framework.response import Response
import tensorflow as tf
import pandas as pd
import numpy as np
import math
import random
import os


class ListIngredient(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class DetailIngredient(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class ListPrediction(APIView):
    # queryset = PredictionEngine.objects.all()
    # serializer_class = PredictionSerializer
    # queryset = ''
    # serializer_class = PredictionSerializer

    def get(self, request):
        currentDirectory = os.getcwd()
        #The import statement is dependent on the environment
        new_model = tf.keras.models.load_model(currentDirectory + '\\pastafy\\data\\ingredient_prediction_model.h5')
        # this import the top pasta we are using into a dataframe
        top_pasta_df = pd.read_csv(currentDirectory + '\\pastafy\\data\\top_pasta.csv', header=0)
        #top_pasta_df.head(5)

        # this imports all the ingredients considered while training
        ingredients_df = pd.read_csv(currentDirectory + '\\pastafy\\data\\ordered_ingredients.csv', header=0, index_col=0)

        #import the ordered ingredients , these map by index to the model so it's important order is preserved
        ingredients_col = pd.read_csv(currentDirectory + '\\pastafy\\data\\ordered_ingredients.csv', header=0, index_col=1).transpose()


        predictor_1 = Predictor(new_model, ingredients_col.columns)

        #test_prediction_result = predictor_1.predictFromList(["sage", "sausage"])
        #test_prediction_result.head(10)
        #test_prediction_result = predictor_1.predictFromList(["sage", "sausage"])
        #return test_prediction_result
        pastaPredictorPipeline_instance = PastaPredictorPipeline(predictor_1, ingredients_df, top_pasta_df)
        result1 = pastaPredictorPipeline_instance.run_pipeline(randomness=3, user_ingredients=["sausage","sage"], numberOfExtraIngredients=10)

        #convert to objects and map properties
        responseObject = ResponseObject(result1[0], result1[1], result1[2])
        
        #return (responseObject)
        # results are : selected pasta, selected ingredients, user entered ingredients, prediction model

        return Response(responseObject.__dict__)
        # Create your views here.


class Predictor:
    def __init__(self, model, ingredients_df_columns):
        self.model = model
        self.ingredients_ordered_list = ingredients_df_columns
    def predict(self, ingredients):
            #The import statement is dependent on the environment

            # y_predict = self.model.predict(ingredients_df.loc[:0])
        y_predict = self.model.predict(ingredients)

        prediction_format = pd.DataFrame(y_predict[0])
        prediction_format = prediction_format.rename({0:"prediction"}, axis=1)
        prediction_format["ingredient"] = self.ingredients_ordered_list
        prediction_final = prediction_format.sort_values(by="prediction", axis=0, ascending=False)
        return prediction_final
    def predictFromList(self, ing_list):
        ingredientFrame = pd.DataFrame(columns=self.ingredients_ordered_list)
        ingredientFrame.loc["list"] = 0
        for i, x in enumerate(self.ingredients_ordered_list):
            if x in ing_list:
                ingredientFrame.iloc[0,i] = 1   
        return self.predict(np.array(ingredientFrame, dtype=np.float))


# this class allows us to fine tune parameters
# - consolidates all the ways the predcition model can be used
# variable we should be able to set
# - the number of ingredients we should predict and return
# - how random the ingredients we predict should be

class PastaPredictorPipeline:
    def __init__(self, predictior, ingredients_df, pasta_df):
        self.predictior = predictior
        self.ingredients =  ingredients_df
        self.pastas = pasta_df["Pasta"].unique()
    # picks randomness on a scale from 0.0 - 1.0
    # randomness is achieved by the number of random ingredients added as
    # well as the popularity of the ingredients added

    def run_pipeline(self, user_ingredients= [], randomness=0, numberOfExtraIngredients=5):
      ingredientsForPrediction, randomPick = self.predict_preprocess(user_ingredients, randomness, numberOfExtraIngredients)
      prediction_result = self.predictior.predictFromList(ingredientsForPrediction)
      pasta_selection = self.select_pasta(prediction_result)
      extra_ingredient_selection = self.select_ingredients(prediction_result, numberOfExtraIngredients, user_ingredients, randomPick)
      return (pasta_selection, extra_ingredient_selection, user_ingredients)

    def pickRandomIngredient(self, randomness, numberOfExtraIngredients):
      randomness = 0 if randomness < 0 else 1 if randomness > 1 else randomness
      number_of_random_points = min(math.ceil(randomness * 5), numberOfExtraIngredients)
      length_of_top_to_pick = round(self.ingredients.shape[0] * randomness)
      random_toChange = random.sample(range(length_of_top_to_pick), number_of_random_points)
      extra_ingredients = []
      for random_index in random_toChange:
        random_ingredient = self.ingredients["0"].iloc[random_index]
        if random_ingredient not in self.pastas:
          extra_ingredients.append(random_ingredient)
      return extra_ingredients

    def predict_preprocess(self, user_ingredients, randomness, numberOfExtraIngredients):
      randomPick = self.pickRandomIngredient(randomness, numberOfExtraIngredients)
      return (user_ingredients + randomPick, randomPick)

    def select_pasta(self, prediction_result):
      selection = 1
      for potential_pasta in prediction_result.ingredient:
        if potential_pasta in self.pastas:
          return potential_pasta

    def select_ingredients(self, prediction_result, numberOfExtraIngredients, user_ingredients, randomPick):
      total_picked = len(randomPick)
      current_index = 0
      new_ingredients = []
      non_allowed_ingredients = randomPick + self.pastas.tolist() + user_ingredients
      while total_picked < numberOfExtraIngredients:
        found = False
        while not found and current_index < self.ingredients.shape[0]:
          current_ingredient = prediction_result["ingredient"].iloc[current_index]
          if current_ingredient not in non_allowed_ingredients:
            new_ingredients.append(current_ingredient)
            found = True

          current_index += 1
        total_picked += 1
      return new_ingredients + randomPick

class ResponseObject:
    def __init__(self, pasta, extra_ingredients, user_selections):
        self.user_selections = user_selections 
        self.pasta= pasta
        self.extra_ingredients = extra_ingredients
