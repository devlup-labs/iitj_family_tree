from django.urls import path
from .views import ResolveAllTreeNodes

urlpatterns = [
    path('tree/', ResolveAllTreeNodes.as_view(), name='tree'),
]