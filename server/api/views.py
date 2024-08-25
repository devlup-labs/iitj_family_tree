from .models import Student
from rest_framework.views import APIView
from django.http import JsonResponse

class ResolveAllTreeNodes(APIView):
    def get(self, request, format=None):
     try:
        students = Student.objects.all()
        student_dict = {}
        root_nodes = []
        
        for student in students:
            student_dict[student.roll_no] = {
                'name': student,
                'roll_no': student.roll_no,
                'picture': student.picture,
                'children': []
            }
        
        for student_data in student_dict.values():
            if student_data['name'].parentId:
                parent_id = student_data['name'].parentId
                if student_dict.get(parent_id):
                    student_dict[parent_id]['children'].append(student_data)
                else:
                    # print(f"Parent with ID {parent_id} not found for student with ID {student_data['roll_no']}")
                    root_nodes.append(student_data)
            else:
                root_nodes.append(student_data)
        
        def build_tree(node):
            serialized_node = {
                'rollNo': node['name'].roll_no,
                'name': node['name'].name,
                'parentId': node['name'].parentId,
                'picture': node['name'].picture,
                'children': [build_tree(child) for child in node['children']]
            }
            return serialized_node
        
        tree_data = [build_tree(node) for node in root_nodes]
        
        return JsonResponse(tree_data, status=200, safe=False)
     except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)