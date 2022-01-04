from django.http import response
from django.test import TestCase
from graphene_django.utils.testing import GraphQLTestCase
import json
from student.models import Student
from mixer.backend.django import mixer


class StudentTestCases(GraphQLTestCase):
    GRAPHQL_URL = 'http://localhost/graphql'

    def setUp(self):
        super().setUp()
        self.student1 = mixer.blend(Student, name='student1', roll_no='1', parentId=None,year=2019)
        self.student2 = mixer.blend(Student, name='student2', roll_no='2', parentId='1', year=2020)
        self.student3 = mixer.blend(Student, name='student3', roll_no='3', parentId='1', year=2020)
        self.student4 = mixer.blend(Student, name='student4', roll_no='4', parentId='1', year=2020)
        self.student5 = mixer.blend(Student, name='student5', roll_no='5', parentId='2')
        self.student6 = mixer.blend(Student, name='student6', roll_no='6', parentId='5')
        self.student7 = mixer.blend(Student, name='student7', roll_no='7', parentId='6')
        self.student8 = mixer.blend(Student, name='student8', roll_no='8', parentId='7')
        self.student9 = mixer.blend(Student, name='student9', roll_no='9', parentId='8')
    
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
        self.assertDictEqual(content['data']['students'][1], {'id': str(self.student2.id), 'name': self.student2.name})
        
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
    
    def test_student_batch(self):
      response= self.query('''
            query {
                studentBatch(roll: "2") {
                  id
                  name
                }
              }
            ''')
      content= json.loads(response.content)
      self.assertResponseNoErrors(response)
      self.assertDictEqual(content['data']['studentBatch'][0][0], {'id': str(self.student2.id), 'name': self.student2.name})
      self.assertDictEqual(content['data']['studentBatch'][0][1], {'id': str(self.student1.id), 'name': self.student1.name})
      self.assertDictEqual(content['data']['studentBatch'][1][0], {'id': str(self.student3.id), 'name': self.student3.name})
      self.assertDictEqual(content['data']['studentBatch'][1][1], {'id': str(self.student1.id), 'name': self.student1.name})
      self.assertDictEqual(content['data']['studentBatch'][2][0], {'id': str(self.student4.id), 'name': self.student4.name})
      self.assertDictEqual(content['data']['studentBatch'][1][1], {'id': str(self.student1.id), 'name': self.student1.name})
    
    def test_student_path(self):
        response = self.query('''
            query {
                studentPath(roll: "9") {
                    id
                    name
                  }
                }
              ''')  
        content= json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertDictEqual(content['data']['studentPath'][6], {'id': str(self.student1.id), 'name': self.student1.name})
        self.assertDictEqual(content['data']['studentPath'][5], {'id': str(self.student2.id), 'name': self.student2.name})
        self.assertDictEqual(content['data']['studentPath'][4], {'id': str(self.student5.id), 'name': self.student5.name})
        self.assertDictEqual(content['data']['studentPath'][3], {'id': str(self.student6.id), 'name': self.student6.name})
        self.assertDictEqual(content['data']['studentPath'][2], {'id': str(self.student7.id), 'name': self.student7.name})
        self.assertDictEqual(content['data']['studentPath'][1], {'id': str(self.student8.id), 'name': self.student8.name})
        self.assertDictEqual(content['data']['studentPath'][0], {'id': str(self.student9.id), 'name': self.student9.name})
    
    def test_student_search(self):
        response = self.query('''
            query {
                studentSearch(searchQuery: "student") {
                    id
                    name
                  }
                }
              ''')
        content= json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertDictEqual(content['data']['studentSearch'][0], {'id': str(self.student1.id), 'name': self.student1.name})
        self.assertDictEqual(content['data']['studentSearch'][1], {'id': str(self.student2.id), 'name': self.student2.name})
        self.assertDictEqual(content['data']['studentSearch'][2], {'id': str(self.student3.id), 'name': self.student3.name})
        self.assertDictEqual(content['data']['studentSearch'][3], {'id': str(self.student4.id), 'name': self.student4.name})
        self.assertDictEqual(content['data']['studentSearch'][4], {'id': str(self.student5.id), 'name': self.student5.name})
        self.assertDictEqual(content['data']['studentSearch'][5], {'id': str(self.student6.id), 'name': self.student6.name})
        self.assertDictEqual(content['data']['studentSearch'][6], {'id': str(self.student7.id), 'name': self.student7.name})
        self.assertDictEqual(content['data']['studentSearch'][7], {'id': str(self.student8.id), 'name': self.student8.name})