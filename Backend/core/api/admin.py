from django.contrib import admin

from .models import (
    UserProgress,
    DailyActivity
)

admin.site.register(UserProgress)

admin.site.register(DailyActivity)