import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom'
import '../components/css/problemDetail.css'

const ProblemDetail = () => {

  const { id } = useParams()

  const [problem, setProblem] = useState(null)

  const [code, setCode] = useState("")

  const [testResults, setTestResults] = useState([])

  const token = localStorage.getItem("token")

  // 🔥 STARTER CODE
  const starterCode = {

    JavaScript:
`function solution() {
  return;
}`,

    Python:
`def solution():
    return`,

    Java:
`class Solution {

  public static void main(String[] args) {

  }

}`,

    C:
`#include <stdio.h>

int main() {

  return 0;
}`,

    "C++":
`#include <iostream>

using namespace std;

int main() {

  return 0;
}`
  }

  // 🔥 FETCH PROBLEM
  useEffect(() => {

    fetch(`http://127.0.0.1:8000/api/problems/${id}/`)

      .then((response) => response.json())

      .then((data) => {

        console.log(data)

        setProblem(data)

        setCode(
          starterCode[data.language] ||
          starterCode["Python"]
        )

      })

      .catch((error) => {

        console.log(error)

      })

  }, [id])

  // 🔥 RUN CODE
  const runCode = async () => {

  const results = []

  for (const test of problem.test_cases) {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/run-code/",
        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            "Authorization":
              `Token ${token}`

          },

          body: JSON.stringify({

            code: code,

            language: problem.language,

            input: test.input

          })

        }
      )

      const data = await response.json()

      const passed =

        data.output?.trim() ===
        test.output?.trim()

      results.push({

        input: test.input,

        expected: test.output,

        actual: data.output,

        status:

          passed
            ? "Passed"
            : "Failed"

      })

    } catch (error) {

      results.push({

        input: test.input,

        expected: test.output,

        actual: "",

        status: "Failed"

      })

      console.log(error)

    }

  }

  setTestResults(results)

  const allPassed =
    results.every(
      (r) => r.status === "Passed"
    )

  // SAVE SUBMISSION
  try {

    const response = await fetch(
      "http://127.0.0.1:8000/api/submissions/",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "Authorization":
            `Token ${token}`

        },

        body: JSON.stringify({

          problem: problem.id,

          code: code,

          language: problem.language,

          status:
            allPassed
              ? "Passed"
              : "Failed"

        })

      }
    )

    const data = await response.json()

    console.log(data)

  } catch (error) {

    console.log(error)

  }

  // LOCAL TRACKING
  if (allPassed) {

    let solved =
      JSON.parse(
        localStorage.getItem(
          "solvedProblems"
        )
      ) || []

    if (
      !solved.includes(problem.title)
    ) {

      solved.push(problem.title)

      localStorage.setItem(
        "solvedProblems",
        JSON.stringify(solved)
      )
    }

    const today =
      new Date()
        .toISOString()
        .split("T")[0]

    let streakData =
      JSON.parse(
        localStorage.getItem(
          "streakData"
        )
      ) || {

        lastSolvedDate: null,

        currentStreak: 0
      }

    if (
      streakData.lastSolvedDate !==
      today
    ) {

      const yesterday =
        new Date()

      yesterday.setDate(
        yesterday.getDate() - 1
      )

      const yesterdayStr =
        yesterday
          .toISOString()
          .split("T")[0]

      if (
        streakData.lastSolvedDate ===
        yesterdayStr
      ) {

        streakData.currentStreak += 1

      } else {

        streakData.currentStreak = 1

      }

      streakData.lastSolvedDate =
        today

      localStorage.setItem(

        "streakData",

        JSON.stringify(streakData)

      )

    }

    let heatmap =
      JSON.parse(
        localStorage.getItem(
          "heatmapData"
        )
      ) || {}

    heatmap[today] =
      (heatmap[today] || 0) + 1

    localStorage.setItem(

      "heatmapData",

      JSON.stringify(heatmap)

    )

  }

}

  // 🔥 LOADING
  if (!problem) {

    return <h1>Loading...</h1>
  }

  return (

    <div className="problem-detail-container">

      {/* 🔥 LEFT */}
      <div className="problem-left">

        <h2>{problem.title}</h2>

        <p>
          <b>Difficulty:</b>
          {" "}
          {problem.difficulty}
        </p>

        <p>
          <b>Topic:</b>
          {" "}
          {problem.topic}
        </p>

        <p>
          <b>Language:</b>
          {" "}
          {problem.language}
        </p>

        <p>
          {problem.description}
        </p>

        {/* 🔥 EXAMPLES */}
        <div className="examples-section">

          <h3>Examples</h3>

          {problem.examples?.map(
            (example, index) => (

              <div
                key={index}
                className="example-box"
              >

                <h4>
                  Example {index + 1}
                </h4>

                <pre>

Input: {example.input}

Output: {example.output}

                </pre>

              </div>

            )
          )}

        </div>

      </div>

      {/* 🔥 RIGHT */}
      <div className="problem-right">

        {/* 🚀 MONACO EDITOR */}
        <Editor
          height="500px"

          language={
            problem.language === "C++"
              ? "cpp"
              : problem.language.toLowerCase()
          }

          theme="vs-dark"

          value={code}

          onChange={(value) =>
            setCode(value)
          }

          options={{
            fontSize: 15,

            minimap: {
              enabled: false
            },

            automaticLayout: true,

            scrollBeyondLastLine: false
          }}
        />

        {/* 🚀 BUTTON */}
        <button
          className="run-btn"
          onClick={runCode}
        >
          Run Code
        </button>

        {/* 🔥 TEST CASES */}
        <div className="testcase-section">

          <h3>Test Cases</h3>

          {problem.test_cases?.map(
            (test, index) => (

              <div
                key={index}
                className="testcase-box"
              >

                <p>
                  <b>Input:</b>
                  {" "}
                  {test.input}
                </p>

                <p>
                  <b>Expected:</b>
                  {" "}
                  {test.output}
                </p>

                {testResults[index] && (

                  <p>

                    {testResults[index]
                      .status === "Passed"

                      ? "✅ Passed"

                      : "❌ Failed"}

                  </p>

                )}

              </div>

            )
          )}

        </div>

      </div>

    </div>
  )
}

export default ProblemDetail