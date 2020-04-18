from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListIngredient.as_view()),
    path('<int:pk>/', views.DetailIngredient.as_view()),
    path('prediction', views.ListPrediction.as_view()),
]