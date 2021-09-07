from django.db import models

class Student(models.Model):
    id= models.CharField(max_length=9)
    name= models.CharField(max_length=50)
    branch= models.CharField(max_length=50)
    year= models.CharField(max_length=4)
    picture= models.URLField(max_length=200)
    homeTown= models.CharField(max_length=200)
    extraCurriculars= models.CharField()
    socialMedia= models.URLField()
    linkedIn= models.URLField(max_length=200)
    email= models.EmailField(max_length=254)
    parentId= models.CharField()


    


# Create your models here.
