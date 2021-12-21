from django.http import response
from django.test import TestCase
import json
from graphene_django.utils.testing import GraphQLTestCase
from student.models import Student
from mixer.backend.django import mixer

class testCasesForStudents(GraphQLTestCase):
    GRAPHQL_URL = 'http://localhost/graphql'
    def setUp(self):
      super().setUp()
      self.student1 = mixer.blend(Student, name='student1', roll_no='1', parentId='root', year=2019)
      self.student2 = mixer.blend(Student, name='student2', roll_no='2', parentId='1', year=2020)
      self.student3 = mixer.blend(Student, name='student3', roll_no='3', parentId='1', year=2020)
      self.student4 = mixer.blend(Student, name='student4', roll_no='4', parentId='1', year=2020) 
    def test_student_query(self):
        response = self.query('''
            query {
                students {
                    id
                    name
                  }
                }
              ''')
        content= json.loads(response.content)
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
        
        