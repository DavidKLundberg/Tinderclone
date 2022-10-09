from django.contrib import admin
from django.urls import path, re_path
from VDB import views
from django.conf.urls import include
from rest_framework.urlpatterns import format_suffix_patterns
from VDB.views import *
from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view

schema_view = get_schema_view(title='Pastebin API')
 

PersonalView_list = PersonalView.as_view({
    'get': 'list',
    'post': 'create'
})

ReportsView_list = ReportsView.as_view({
    'get': 'list',
    'post': 'create'
})

MatchesView_list = MatchesView.as_view({
    'get': 'list',
    'post': 'create'
})
ImagesView_list = ImagesView.as_view({
    'get': 'list',
    'post': 'create'
})
RoomView_list =  RoomView.as_view({
    'get': 'list',
    'post': 'create'
})

MessageView_list =  MessageView.as_view({
    'get': 'list',
    'post': 'create'
})

ExpoPushTokenView_list =  ExpoPushTokenView.as_view({
    'get': 'list',
    'post': 'create'
})
LegalView_list =  LegalView.as_view({
    'get': 'list',
    'post': 'create'
})
PremiumMatchView_list =  PremiumMatchView.as_view({
    'get': 'list',
    'post': 'create'
})
PaymentView_list =  PaymentView.as_view({
    'get': 'list',
    'post': 'create'
})
PaymentView_detail = PaymentView.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
    })
PremiumMatchView_detail = PremiumMatchView.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
    })
LegalView_detail = LegalView.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
    })
ExpoPushTokenView_detail = ExpoPushTokenView.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
    })
    
ImagesView_detail = ImagesView.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
})
PersonalView_detail = PersonalView.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
    })
    


ReportsView_detail = ReportsView.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
    })
    


MatchesView_detail = MatchesView.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
    })
    


RoomView_detail = RoomView.as_view({
    'get':'list',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
    })
    


MessageView_detail = MessageView.as_view({
    'get':'list',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
    })



# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'users', views.USEViewSet,basename="Useers" )
router.register(r'PersonalView', views.PersonalView, basename="Personal")
router.register(r'ReportsView', views.ReportsView,basename='Reports')
router.register(r'MatchesView', views.MatchesView)
router.register(r'RoomView', views.RoomView, basename="Room")
router.register(r'ImagesView', views.ImagesView, basename="Images")
router.register(r'ExpoPushTokenView',views.ExpoPushTokenView, basename="ExpoPushToken")
router.register(r'LegalView', views.LegalView, basename="Legal")
router.register(r'PremiumMatchView', views.PremiumMatchView, basename="PremiumMatchView")
router.register(r'PaymentView', views.PaymentView, basename="PaymentView")
router.register(r'MessageView', views.MessageView, basename="Message")



urlpatterns = [
  #  url(r"^chat/$", views.Room),

   re_path(r'^schema/$', schema_view),
## ADD DETAILED 
   #url(r'^rest-auth/', include('rest_auth.urls')),
   #url(r'^accounts/', include('allauth.urls'), name='socialaccount_signup'),
   
   re_path(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
   
   path('', include(router.urls)),

]
