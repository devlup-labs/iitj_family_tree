from django.contrib import admin
#from student.models import Student

from .models import Student

class StudentAdmin(admin.ModelAdmin):
  save_as=True

admin.site.register(Student, StudentAdmin)
