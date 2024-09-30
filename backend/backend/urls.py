from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import UserViewSet, NoteViewSet, TodoViewSet, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('', include(router.urls)),
    path('api-auth', include('rest_framework.urls'))
]
