from django.contrib import admin
from django.urls import path, re_path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [	
	re_path('admin/', admin.site.urls),
    #re_path(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path('', include('VDB.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

