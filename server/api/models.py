from django.db import models

class Student(models.Model):
    name= models.CharField(max_length=50)
    roll_no= models.CharField(max_length=9,unique=True)
    year= models.CharField(max_length=4)
    picture= models.URLField(max_length=200, blank=True,null=True)
    # picture=models.ImageField(upload_to='images/', blank=True,null=True )
    parentId= models.CharField(max_length=400,  default=None, blank=True, null=True)
    linkedIn= models.URLField(max_length=200, blank=True,null=True)
