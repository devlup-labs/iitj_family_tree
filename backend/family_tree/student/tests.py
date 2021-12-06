from django.test import TestCase
from graphene_django.utils.testing import GraphQLTestCase
import json
from student.models import Student
from mixer.backend.django import mixer


class StudentTestCases(GraphQLTestCase):
    GRAPHQL_URL = 'http://localhost/graphql'
    def setUp(self):
      super().setUp()
      self.student1 = mixer.blend(Student, roll_no="B20AI014", parentId="B20AI100", name="Jaimin")
      self.student2 = mixer.blend(Student, roll_no="B20AI100")
      student2_roll_no = self.student2.roll_no

    def test_children_query(self):
        response = self.query( '''
            query {
                children(parentId: "B20AI100"){
                    rollNo
                    name
                  }
                }
              ''' )
            
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertDictEqual(content['data']['children'][0], {'rollNo': 'B20AI014', 'name': 'Jaimin'})
