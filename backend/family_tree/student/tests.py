from django.test import TestCase
from graphene_django.utils.testing import GraphQLTestCase
import json
from student.models import Student
from mixer.backend.django import mixer


class StudentTestCases(GraphQLTestCase):
    GRAPHQL_URL = 'http://localhost/graphql'

    def setUp(self):
        super().setUp()
        self.student1 = mixer.blend(Student, name='student1', roll_no='1', parentId='root')
        self.student2 = mixer.blend(Student, name='student2', roll_no='2', parentId='1')
        self.student3 = mixer.blend(Student, name='student3', roll_no='3', parentId='1')
        self.student4 = mixer.blend(Student, name='student4', roll_no='4', parentId='1')
    
    
    def test_children_query(self):
        response = self.query('''
            query {
                children(parentId: "1"){
                    rollNo
                    name
                  }
                }
              ''')

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertDictEqual(content['data']['children'][0], {'rollNo': '2', 'name': 'student2'})
        self.assertDictEqual(content['data']['children'][1], {'rollNo': '3', 'name': 'student3'})
        self.assertDictEqual(content['data']['children'][2], {'rollNo': '4', 'name': 'student4'})
        
    def test_student_query(self):
        response = self.query('''
            query {
                students {
                    id
                    name
                  }
                }
              ''')
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertDictEqual(content['data']['students'][0], {'id': str(self.student1.id), 'name': self.student1.name})
        self.assertDictEqual(content['data']['students'][1], {'id': str(self.student2.id), 'name': self.student2.name})\
        
    def test_student_sibling(self):
        response = self.query('''
            query {
                studentSibling(roll: "2") {
                    id
                    name
                  }
                }
              ''')
        content= json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertDictEqual(content['data']['studentSibling'][0], {'id': str(self.student3.id), 'name': self.student3.name})
        self.assertDictEqual(content['data']['studentSibling'][1], {'id': str(self.student4.id), 'name': self.student4.name})
