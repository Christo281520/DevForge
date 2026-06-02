from rest_framework.response import Response
import subprocess
import tempfile
import os

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from .models import (
    Problem,
    Submission
)

from .serializers import (
    ProblemSerializer,
    SubmissionSerializer
)

from api.models import UserProgress


# 🔥 GET ALL PROBLEMS
@api_view(['GET'])

def getProblems(request):

    problems = Problem.objects.all()

    serializer = ProblemSerializer(
        problems,
        many=True
    )

    return Response(serializer.data)


# 🔥 GET SINGLE PROBLEM
@api_view(['GET'])

def getProblem(request, pk):

    problem = Problem.objects.get(id=pk)

    serializer = ProblemSerializer(
        problem,
        many=False
    )

    return Response(serializer.data)


# 🔥 GET + CREATE SUBMISSIONS
@api_view(['GET', 'POST'])

@permission_classes([IsAuthenticated])

def createSubmission(request):

    # 🔥 GET
    if request.method == 'GET':

        submissions = Submission.objects.filter(
            user=request.user
        ).order_by('-created_at')

        serializer = SubmissionSerializer(
            submissions,
            many=True
        )

        return Response(serializer.data)

    # 🔥 POST
    elif request.method == 'POST':

        data = request.data.copy()

        data['user'] = request.user.id

        serializer = SubmissionSerializer(
            data=data
        )

        if serializer.is_valid():

            submission = serializer.save()

            # 🔥 UPDATE PROGRESS
            if submission.status == "Passed":

                progress, created = UserProgress.objects.get_or_create(
                    user=submission.user
                )

                progress.solved_count += 1

                progress.streak += 1

                progress.save()

            return Response(serializer.data)

        return Response(serializer.errors)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def runCode(request):

    code = request.data.get('code')
    language = request.data.get('language')
    test_input = request.data.get('input', '')

    try:

        # PYTHON
        if language == "Python":

            with tempfile.NamedTemporaryFile(
                delete=False,
                suffix=".py",
                mode="w",
                encoding="utf-8"
            ) as f:

                f.write(code)

                filename = f.name

            result = subprocess.run(
                ["python", filename],
                input=test_input,
                text=True,
                capture_output=True,
                timeout=5
            )

            os.remove(filename)

            return Response({

                "output": result.stdout.strip(),

                "error": result.stderr.strip()

            })

        # JAVASCRIPT
        elif language == "JavaScript":

            with tempfile.NamedTemporaryFile(
                delete=False,
                suffix=".js",
                mode="w",
                encoding="utf-8"
            ) as f:

                f.write(code)

                filename = f.name

            result = subprocess.run(

                ["node", filename],

                input=test_input,

                text=True,

                capture_output=True,

                timeout=5

            )

            os.remove(filename)

            return Response({

                "output": result.stdout.strip(),

                "error": result.stderr.strip()

            })

        # JAVA
        elif language == "Java":

            temp_dir = tempfile.mkdtemp()

            java_file = os.path.join(
                temp_dir,
                "Solution.java"
            )

            with open(
                java_file,
                "w",
                encoding="utf-8"
            ) as f:

                f.write(code)

            compile_result = subprocess.run(

                ["javac", java_file],

                capture_output=True,

                text=True

            )

            if compile_result.returncode != 0:

                return Response({

                    "output": "",

                    "error":
                        compile_result.stderr

                })

            run_result = subprocess.run(

                [
                    "java",
                    "-cp",
                    temp_dir,
                    "Solution"
                ],

                input=test_input,

                capture_output=True,

                text=True,

                timeout=5

            )

            return Response({

                "output":
                    run_result.stdout.strip(),

                "error":
                    run_result.stderr.strip()

            })

        else:

            return Response({

                "output": "",

                "error":
                    "Language not supported"

            })

    except Exception as e:

        return Response({

            "output": "",

            "error": str(e)

        })