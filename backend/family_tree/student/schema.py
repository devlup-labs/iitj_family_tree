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
    children=graphene.List(StudentType, id_of_parent=graphene.String())

    def resolve_students(root,info):
        return Student.objects.all()

    def resolve_children(id_of_parent):
        children_qset = Student.objects.filter(parentId=id_of_parent)
        return children_qset


schema=graphene.Schema(query=Query)
