from django.contrib import admin
from api.models import Student
from import_export.admin import ImportExportModelAdmin
from .resource import ReportResource  



class ReportAdmin(ImportExportModelAdmin):
     resource_class = ReportResource
     ordering=["roll_no",]
     list_display = ["roll_no","name","parentId",]
     search_fields = ["roll_no","name",]
           
admin.site.register(Student, ReportAdmin)

