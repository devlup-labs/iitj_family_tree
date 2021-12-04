from django.test import TestCase
import json
from graphene_django.utils.testing import GraphQLTestCase
from student.models import Student
from mixer.backend.django import mixer

class testCasesForStudents(GraphQLTestCase):
    GRAPHQL_URL = 'http://localhost/graphql'
    def setUp(self):
      super().setUp()
      self.student1 = mixer.blend(Student, name='student1')
      self.student2 = mixer.blend(Student, name='student2')
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