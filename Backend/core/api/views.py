from django.db.models import Count
from django.contrib.auth.models import User
from problems.models import Problem

from rest_framework.response import Response

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from .models import (
    UserProgress,
    DailyActivity
)

from .serializers import (
    UserSerializer
)

from django.contrib.auth import authenticate

from rest_framework.authtoken.models import Token

from problems.models import Submission


# 🔥 REGISTER USER
@api_view(['POST'])

def registerUser(request):

    serializer = UserSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors)


# 🔥 LOGIN USER
@api_view(['POST'])

def loginUser(request):

    username = request.data.get('username')

    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        token, created = Token.objects.get_or_create(
            user=user
        )

        return Response({

            'token': token.key,

            'username': user.username
        })

    return Response({

        'error': 'Invalid Credentials'
    })


# 🔥 ANALYTICS
@api_view(['GET'])

@permission_classes([IsAuthenticated])

def getAnalytics(request):

    user = request.user

    submissions = Submission.objects.filter(
        user=user
    )

    total_submissions = submissions.count()

    passed_count = submissions.filter(
        status="Passed"
    ).count()

    failed_count = submissions.filter(
        status="Failed"
    ).count()

    # 🔥 SUCCESS RATE
    success_rate = 0

    if total_submissions > 0:

        success_rate = (
            passed_count / total_submissions
        ) * 100

    # 🔥 USER PROGRESS
    progress, created = UserProgress.objects.get_or_create(
        user=user
    )

    # 🔥 LANGUAGE STATS
    language_stats = submissions.values(
        'language'
    ).annotate(
        total=Count('language')
    )

    # 🔥 RECENT ACTIVITY
    recent_activity = submissions.order_by(
        '-created_at'
    )[:5]

    recent_data = []

    for item in recent_activity:

        recent_data.append({

            "problem": item.problem.title,

            "language": item.language,

            "status": item.status,

            "created_at": item.created_at
        })

    return Response({

        "total_submissions": total_submissions,

        "passed_count": passed_count,

        "failed_count": failed_count,

        "success_rate": round(success_rate, 2),

        "solved_count": progress.solved_count,

        "streak": progress.streak,

        "language_stats": language_stats,

        "recent_activity": recent_data
    })


# 🔥 LEADERBOARD
@api_view(['GET'])

def getLeaderboard(request):

    leaderboard = UserProgress.objects.select_related(
        'user'
    ).order_by(
        '-solved_count',
        '-streak'
    )

    data = []

    rank = 1

    for item in leaderboard:

        data.append({

            "rank": rank,

            "username": item.user.username,

            "solved_count": item.solved_count,

            "streak": item.streak
        })

        rank += 1

    return Response(data)

@api_view(['GET'])
def getStats(request):

    problems = Problem.objects.count()

    developers = User.objects.count()

    languages = Problem.objects.values(
        'language'
    ).distinct().count()

    challenges = Problem.objects.count()

    return Response({

        "problems": problems,

        "developers": developers,

        "languages": languages,

        "challenges": challenges

    })