from django.urls import path

from .views import (

    registerUser,

    loginUser,

    getAnalytics,

    getLeaderboard,

    getStats
)

urlpatterns = [

    path(
        'register/',
        registerUser
    ),

    path(
        'login/',
        loginUser
    ),

    path(
        'analytics/',
        getAnalytics
    ),

    path(
        'leaderboard/',
        getLeaderboard
    ),

    path('stats/', getStats),
]