from rest_framework import serializers
from .models import Item, Books

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model= Books
        fields='__all__'