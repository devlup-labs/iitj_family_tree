import graphene
from graphene_django import DjangoObjectType
from student.models import Student
from django.db.models import Q

class StudentType(DjangoObjectType):
    class Meta:
        model= Student
        fields= ("id","name","branch","year","picture","homeTown","extraCurriculars","socialMedia", "linkedIn","email","parentId","roll_no")
        filter_fields=["id","name","branch","year","email","parentId","roll_no"]
def tree_for_batch(root,info,batch):
    tree_for_batch=[]
    for student in batch:
        roll= student.roll_no
        pathObjects=[]
        while(Student.objects.get(roll_no=roll).parentId!=None):
            student=Student.objects.get(roll_no=roll)
            pathObjects.append(student)
            roll= student.parentId
        pathObjects.append(Student.objects.get(roll_no=roll))
        tree_for_batch.append(pathObjects)
    return tree_for_batch

class Query(graphene.ObjectType):
    students=graphene.List(StudentType)
    children=graphene.List(StudentType, parentId=graphene.String())
    student_path= graphene.List(StudentType, roll=graphene.String())
    student_sibling= graphene.List(StudentType, roll=graphene.String())
    student_search= graphene.List(StudentType, search_query=graphene.String())
    student_batch= graphene.List(graphene.List(StudentType), roll=graphene.String())
    student_node= graphene.Field(StudentType, roll=graphene.String())

    def resolve_student_node(root,info,roll):
        return Student.objects.get(roll_no=roll)

    def resolve_students(root,info):
        return Student.objects.all()

    def resolve_children(root, info, parentId):
        return Student.objects.filter(parentId=parentId)
    
    def resolve_student_path(root, info, roll):
        pathObjects=[]
        while(Student.objects.get(roll_no=roll).parentId!=None):
            student=Student.objects.get(roll_no=roll)
            pathObjects.append(student)
            roll= student.parentId
        pathObjects.append(Student.objects.get(roll_no=roll))
        return pathObjects
    
    def resolve_student_sibling(root,info, roll):
        student=Student.objects.get(roll_no=roll)
        return Student.objects.filter(parentId=student.parentId).exclude(roll_no=roll)


    def resolve_student_batch(root,info,roll):
        current_node= Student.objects.get(roll_no=roll)
        year_of_node= current_node.year
        current_batch= Student.objects.filter(year=year_of_node)
        # tree_for_batch=[]
        # for person in current_batch:
        #     tree_for_batch.append(Query.resolve_student_path(root,info,person.roll_no))
        # return tree_for_batch
        return tree_for_batch(root,info,current_batch)


    def resolve_student_search(root,info, search_query):
        return Student.objects.filter(Q(name__icontains=search_query) | Q(roll_no__icontains= search_query))[0:8]


schema=graphene.Schema(query=Query)
