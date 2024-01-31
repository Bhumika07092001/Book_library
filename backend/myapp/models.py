from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=5000)


class Books(models.Model):
    title= models.CharField(max_length=500)
    author= models.CharField(max_length=500)
    genre= models.CharField(max_length=500)

