from django.contrib import admin
#from student.models import Student

from .models import Student , SocialMedia

class StudentAdmin(admin.ModelAdmin):
  save_as=True

class SocialMediaAdmin(admin.ModelAdmin):
  save_as=True

admin.site.register(Student, StudentAdmin)
admin.site.register(SocialMedia, SocialMediaAdmin)
