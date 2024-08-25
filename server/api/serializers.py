from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    # picture=serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)
    class Meta:
        model = Student
        fields= '__all__'
