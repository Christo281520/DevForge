from rest_framework import serializers

from .models import (
    Problem,
    Submission
)


class ProblemSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Problem

        fields = '__all__'


class SubmissionSerializer(
    serializers.ModelSerializer
):

    problem_title = serializers.CharField(
        source='problem.title',
        read_only=True
    )

    class Meta:

        model = Submission

        fields = '__all__'