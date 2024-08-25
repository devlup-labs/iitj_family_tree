import graphene
from graphene_django import DjangoObjectType
from api.models import Student
from django.db.models import Q


class StudentType(DjangoObjectType):
    class Meta:
        model= Student
        fields = "__all__"

class Query(graphene.ObjectType):
    students=graphene.List(StudentType)
    student_search= graphene.List(StudentType, search_query=graphene.String())
    student = graphene.Field(StudentType, roll_number=graphene.String())
    parent = graphene.Field(StudentType, roll_number=graphene.String())
    sibling = graphene.List(StudentType, roll_number=graphene.String())
    children = graphene.List(StudentType, roll_number=graphene.String())
    
    def resolve_students(root,info):
        return Student.objects.all()

    def resolve_student(self, info, roll_number):
        student = Student.objects.get(roll_no=roll_number)
       
        return student

    def resolve_parent(self, info, roll_number):
        student = Student.objects.get(roll_no=roll_number)
        parent = None

        if student.parentId:
            parent = Student.objects.get(roll_no=student.parentId)

        return parent
    def resolve_children(self, info, roll_number):
        student = Student.objects.get(roll_no=roll_number)
        print(student)
        # children = None
        children = list(Student.objects.filter(parentId=student.roll_no))
        
        return children
    def resolve_sibling(self, info, roll_number):
        student = Student.objects.get(roll_no=roll_number)
        siblings = None

        if student.parentId:
            siblings = list(Student.objects.filter(parentId=student.parentId).exclude(roll_no=student.roll_no))

        
        return siblings
    
   


    def resolve_student_search(root,info, search_query):
        return Student.objects.filter(Q(name__icontains=search_query) | Q(roll_no__icontains= search_query))[0:8]

schema=graphene.Schema(query=Query)