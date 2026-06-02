from django.urls import path

from .views import (
    getProblems,
    getProblem,
    createSubmission,
    runCode
)

urlpatterns = [

    path(
        'problems/',
        getProblems
    ),

    path(
        'problems/<str:pk>/',
        getProblem
    ),

    path(
        'submissions/',
        createSubmission
    ),
    path(
    'run-code/',
    runCode
),
path(
    'test/',
    getProblems
),
]