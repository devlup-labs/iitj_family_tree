from django.shortcuts import render
from django.http import HttpResponse
from .models import Student, SocialMedia
import pandas as pd


def index(request):
    return HttpResponse(" ")
# Create your views here.

def upload(request):
    if request.method == 'POST':
        Student.objects.all().delete()
        SocialMedia.objects.all().delete()
        file = request.FILES['files']
        path = file.file
        dataFrame = pd.read_excel(path)
        for line in dataFrame.values.tolist():
            socialMediaObj=SocialMedia.objects.create(
                facebook=line[10],
                instagram=line[11]
            )
            ssoID = socialMediaObj.id
            print(ssoID)
            Student.objects.create(
                roll_no=line[0],
                name=line[1],
                branch=line[2],
                year=line[3],
                picture=line[4],
                homeTown=line[5],
                extraCurriculars=line[6],
                linkedIn=line[7],
                email=line[8],
                parentId=line[9],
                socialMedia=socialMediaObj
            )

    return render(request, 'excelImport.html')