# labeling/models.py
from django.db import models

class LabeledData(models.Model):
    text = models.TextField(null=True, blank=True)
    label = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        app_label = 'labeling'
