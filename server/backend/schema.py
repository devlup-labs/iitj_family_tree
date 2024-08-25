import graphene
from api.schema import Query as student_query
class Query(student_query):
    pass

schema=graphene.Schema(query=Query)