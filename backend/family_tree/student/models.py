from django.db import models

class Student(models.Model):
    roll_no= models.CharField(max_length=9)
    name= models.CharField(max_length=50)
    branch= models.CharField(max_length=50)
    year= models.CharField(max_length=4)
    picture= models.URLField(max_length=200)
    homeTown= models.CharField(max_length=200)
<<<<<<< HEAD
    extraCurriculars= models.CharField(max_length=2000)
    socialMedia= models.ForeignKey('SocialMedia')
    linkedIn= models.URLField(max_length=200)
    email= models.EmailField(max_length=254)
    parentId= models.CharField(max_length=9)
=======
    extraCurriculars= models.CharField(max_length=400)
    socialMedia= models.URLField()
    linkedIn= models.URLField(max_length=200)
    email= models.EmailField(max_length=254)
    parentId= models.CharField(max_length=400)

>>>>>>> f3c5d575314c25efa18736f1f5355e7c052ec9a5

class SocialMedia(models.Model):
		facebook = models.URLField(max_length=255)
		instagram = models.URLField(max_length=255)
    


# Create your models here.
