# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Item, Books
from django.http import Http404
from .serializers import ItemSerializer, BooksSerializer

class ItemList(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemDetail(APIView):
    def get_object(self, pk):
        try:
            return Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        item = self.get_object(pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, pk):
        item = self.get_object(pk)
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        item = self.get_object(pk)
        item.delete()
        return Response(item,status=status.HTTP_204_NO_CONTENT)
    
class Books_detail(APIView):
     def get_object(self, pk):
        try:
            return Books.objects.get(pk=pk)
        except Books.DoesNotExist:
            raise Http404

     def get(self, request, pk, format=None):
        book = self.get_object(pk)
        serializer = BooksSerializer(book)
        return Response(serializer.data)
     
     def put(self, request, pk):
         book= self.get_object(pk)
         serialize= BooksSerializer(book,data=request.data)
         if serialize.is_valid():
             serialize.save()
             return Response(serialize.data, status=status.HTTP_201_CREATED)
         return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
     
     def delete(self, request,pk):
         book= self.get_object(pk)
         book.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)
        
     
class Books_list(APIView):
    def get(self, request):
        items = Books.objects.all()
        serializer = BooksSerializer(items, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serialize=BooksSerializer(data=request.data)
        if serialize.is_valid():
             serialize.save()
             return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)


