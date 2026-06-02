from django.db import models
from django.contrib.auth.models import User


class Problem(models.Model):

    DIFFICULTY_CHOICES = [

        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard'),
    ]

    title = models.CharField(max_length=255)

    difficulty = models.CharField(
        max_length=10,
        choices=DIFFICULTY_CHOICES
    )

    topic = models.CharField(max_length=100)

    language = models.CharField(
        max_length=50,
        default="Python"
    )

    description = models.TextField()

    examples = models.JSONField()

    test_cases = models.JSONField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.title


class Submission(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE
    )

    code = models.TextField()

    language = models.CharField(max_length=50)

    status = models.CharField(max_length=20)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"{self.user.username} - {self.problem.title}"