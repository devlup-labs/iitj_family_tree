import graphene
from graphene_django import DjangoObjectType
from api.models import Student
from django.db.models import Q
from django.core.cache import cache

class StudentType(DjangoObjectType):
    class Meta:
        model = Student
        fields = "__all__"

class StudentTreeType(graphene.ObjectType):
    roll_no = graphene.String()
    name = graphene.String()
    parent_id = graphene.String(required=False)
    picture = graphene.String()
    children = graphene.List(lambda: StudentTreeType)

class Query(graphene.ObjectType):
    students = graphene.List(StudentType)
    student_search = graphene.List(StudentType, search_query=graphene.String(), limit=graphene.Int(default_value=8))
    student = graphene.Field(StudentType, roll_number=graphene.String())
    parent = graphene.Field(StudentType, roll_number=graphene.String())
    sibling = graphene.List(StudentType, roll_number=graphene.String())
    children = graphene.List(StudentType, roll_number=graphene.String())
    student_tree = graphene.List(StudentTreeType)

    def resolve_students(root, info):
        cache_key = "all_students"
        students = cache.get(cache_key)
        if not students:
            students = Student.objects.all()
            cache.set(cache_key, students, timeout=600)  # Cache for 10 minutes
        return students

    def resolve_student(self, info, roll_number):
        cache_key = f"student_{roll_number}"
        student = cache.get(cache_key)
        if not student:
            try:
                student = Student.objects.get(roll_no=roll_number)
                cache.set(cache_key, student, timeout=300)  # Cache for 5 minutes
            except Student.DoesNotExist:
                return None
        return student

    def resolve_parent(self, info, roll_number):
        cache_key = f"parent_{roll_number}"
        parent = cache.get(cache_key)
        if parent is None:
            try:
                student = Student.objects.get(roll_no=roll_number)
                if student.parentId:
                    parent_roll_no = student.parentId
                    parent_cache_key = f"student_{parent_roll_no}"
                    parent = cache.get(parent_cache_key)
                    if not parent:
                        parent = Student.objects.get(roll_no=parent_roll_no)
                        cache.set(parent_cache_key, parent, timeout=300)
                else:
                    parent = None
                cache.set(cache_key, parent, timeout=300)
            except Student.DoesNotExist:
                return None
        return parent

    def resolve_children(self, info, roll_number):
          cache_key = f"children_{roll_number}"
          children = cache.get(cache_key)
          if children is None:
              try:
                  student = Student.objects.get(roll_no=roll_number)
                  children = list(Student.objects.filter(parentId=student.roll_no))
                  cache.set(cache_key, children, timeout=300)
              except Student.DoesNotExist:
                  return []
          return children

    def resolve_sibling(self, info, roll_number):
        cache_key = f"siblings_{roll_number}"
        siblings = cache.get(cache_key)
        if siblings is None:
            try:
                student = Student.objects.get(roll_no=roll_number)
                if student.parentId:
                    siblings = list(Student.objects.filter(parentId=student.parentId).exclude(roll_no=student.roll_no))
                    cache.set(cache_key, siblings, timeout=300)
                else:
                    siblings = []
                cache.set(cache_key, siblings, timeout=300)
            except Student.DoesNotExist:
                return []
        return siblings

    def resolve_student_tree(self, info):
        cache_key = "student_tree"
        student_tree = cache.get(cache_key)
        if not student_tree:
            students = Student.objects.all()
            student_dict = {}
            root_nodes = []

            for student in students:
                student_dict[student.roll_no] = {
                    'name': student.name,
                    'roll_no': student.roll_no,
                    'picture': student.picture,
                    'parent_id': student.parentId,
                    'children': []
                }

            for student_data in student_dict.values():
                if student_data['parent_id']:
                    parent_id = student_data['parent_id']
                    if student_dict.get(parent_id):
                        student_dict[parent_id]['children'].append(student_data)
                    else:
                        root_nodes.append(student_data)
                else:
                    root_nodes.append(student_data)

            def build_tree(node):
                return StudentTreeType(
                    roll_no=node['roll_no'],
                    name=node['name'],
                    parent_id=node['parent_id'],
                    picture=node['picture'],
                    children=[build_tree(child) for child in node['children']]
                )

            student_tree = [build_tree(node) for node in root_nodes]
            cache.set(cache_key, student_tree, timeout=3600)  # Cache for 1 hour

        return student_tree

    def resolve_student_search(root, info, search_query, limit):
        cache_key = f"student_search_{search_query}_{limit}"
        results = cache.get(cache_key)
        if not results:
            results = Student.objects.filter(Q(name__icontains=search_query) | Q(roll_no__icontains=search_query))[:limit]
            cache.set(cache_key, results, timeout=300)  # Cache for 5 minutes
        return results

schema = graphene.Schema(query=Query)
