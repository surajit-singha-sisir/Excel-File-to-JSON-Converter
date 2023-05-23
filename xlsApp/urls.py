from django.urls import path
from xlsApp.views import read_excel

urlpatterns = [
    path('', read_excel, name='read_excel'),
]
