from django.db import models
import tensorflow as tf
import pandas as pd
import numpy as np
import math
import random
import os

class Ingredient(models.Model):
    ingredient = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.ingredient

#this model is not being used as we are using csv files for data and not the database
#todo create table and store data from files in the future
class PredictionEngine(models.Model):
    test_prediction_result = models.TextField()
    result1 = models.TextField()
    #result2 = result()

    def __str__(self):
        # results are : selected pasta, selected ingredients, user entered ingredients, prediction model
        return self.result1
        #return '%s %s' % (self.result1, self.result())
