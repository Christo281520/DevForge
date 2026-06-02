from django.db import models
from django.contrib.auth.models import User


class UserProgress(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    solved_count = models.IntegerField(default=0)

    streak = models.IntegerField(default=0)

    last_solved_date = models.DateField(
        null=True,
        blank=True
    )

    def __str__(self):

        return self.user.username


class DailyActivity(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    date = models.DateField()

    solved_count = models.IntegerField(default=0)

    def __str__(self):

        return f"{self.user.username} - {self.date}"