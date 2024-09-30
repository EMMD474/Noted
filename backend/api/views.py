from django.contrib.auth.models import User
from .models import Note, Todo
from .serializer import UserSerializer, TodoSerializer, NoteSerializer, CustomTokenObtainPairSerializer
from rest_framework import permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by("created_at")
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by("created_at")
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
