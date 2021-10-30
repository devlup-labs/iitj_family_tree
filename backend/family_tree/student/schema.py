import graphene
from graphene_django import DjangoObjectType
from student.models import Student

class StudentType(DjangoObjectType):
    class Meta:
        model= Student
        fields= ("id","name","branch","year","picture","homeTown","extraCurriculars","socialMedia", "linkedIn","email","parentId","roll_no")
        filter_fields=["id","name","branch","year","email","parentId","roll_no"]

class Query(graphene.ObjectType):
    students=graphene.List(StudentType)
    path= graphene.List(StudentType, year=graphene.Decimal())
    batch= graphene.List(StudentType, temp=graphene.String(), currentYear=graphene.Decimal())
    def dumyFunc(year):
        path=[]
        for i in range(1,year-2011):
            path.append(i)
        return path
    def resolveBatch(currentYear,temp):
        batch=[]
        while(Student.objects.filter(roll_no=temp)[0].year== currentYear):
            batch.append(dumyFunc(currentYear))
            temp= Student.objects.filter(roll_no=temp)[0]+1
        return batch

schema=graphene.Schema(query=Query)

    
