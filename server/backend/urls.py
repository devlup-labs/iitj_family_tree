from django.contrib import admin
from django.urls import path,include
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.conf import settings 
from django.conf.urls.static import static

urlpatterns = [
    path('ftadmin/admin/', admin.site.urls),
    path("ftadmin/graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path("ftadmin/", include("api.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
