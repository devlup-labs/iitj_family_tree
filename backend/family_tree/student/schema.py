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
    student_path= graphene.List(StudentType, roll=graphene.String())
    tree_for_batch= graphene.List(StudentType,roll=graphene.String())
    def resolve_students(root,info):
        return Student.objects.all()

    def resolve_student_path(root, info, roll):
        pathObjects=[]
        while(Student.objects.get(roll_no=roll).parentId!="root"):
            student=Student.objects.get(roll_no=roll)
            pathObjects.append(student)
            roll= student.parentId
        pathObjects.append(Student.objects.get(roll_no=roll))
        return pathObjects
    def resolve_batch(root,info,roll):
        currentNode= Student.objects.get(roll_no=roll)
        year_of_node= currentNode.year
        currentBatch= Student.objects.filter(year=year_of_node)
        tree_for_batch=[]
        for i in currentBatch:
            tree_for_batch.append(Query.resolve_student_path(root,info,i.roll_no))
        return tree_for_batch
schema=graphene.Schema(query=Query)

    
