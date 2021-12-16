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
