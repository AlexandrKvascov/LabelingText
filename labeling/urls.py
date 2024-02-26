# labeling/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('labeling/', views.label_text, name='label_text'),
    path('label/', views.new_label, name='new_label'),
    path('run_python_script/', views.run_python_script, name='run_python_script'),
    path('ModelsNeyron/', views.ModelsNeyron, name='ModelsNeyron'),
    path('result/', views.result_page, name='result_page'),
    path('login', views.login_view, name='login'),
    path('', views.your_register_view, name='register'),
    path('Regular_text/', views.Regular_text, name='Regular_text'),
]
