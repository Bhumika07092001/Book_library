# api/urls.py
from django.urls import path
from .views import ItemList, ItemDetail,Books_detail,Books_list

urlpatterns = [
    path('items/', ItemList.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemDetail.as_view(), name='item-detail'),
    path('book/<int:pk>/',Books_detail.as_view(), name='book-detail'),
    path('books/',Books_list.as_view(), name='book-detail'),

]