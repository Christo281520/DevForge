import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { problemDetails } from '../data/problems'
import '../components/css/problemDetail.css'

const ProblemDetail = () => {

  const location = useLocation()
  const { title, difficulty, topic, language } = location.state || {}

  const data = problemDetails[title]

  const [selectedLanguage] = useState(language || "JavaScript")
  const [code, setCode] = useState("")
  const [testResults, setTestResults] = useState([])

  const starterCode = {
    JavaScript: `function solution() {\n  return;\n}`,
    Python: `def solution():\n    return`,
    Java: `class Solution {\n  public static void main(String[] args) {\n  }\n}`,
    C: `#include <stdio.h>\nint main() {\n  return 0;\n}`,
    "C++": `#include <iostream>\nusing namespace std;\nint main() {\n  return 0;\n}`
  }

  useEffect(() => {
    setCode(starterCode[selectedLanguage])
  }, [selectedLanguage])

  const runCode = () => {

    const results = data?.testCases.map((test) => {
      const passed = code.includes("return")

      return {
        input: test.input,
        expected: test.expected,
        status: passed ? "Passed" : "Failed"
      }
    })

    setTestResults(results)

    const allPassed = results.every(r => r.status === "Passed")

    if (allPassed) {

      // ✅ SOLVED TRACKING
      let solved = JSON.parse(localStorage.getItem("solvedProblems")) || []
      if (!solved.includes(title)) {
        solved.push(title)
        localStorage.setItem("solvedProblems", JSON.stringify(solved))
      }

      // 🔥 STREAK SYSTEM
      const today = new Date().toISOString().split("T")[0]

      let streakData = JSON.parse(localStorage.getItem("streakData")) || {
        lastSolvedDate: null,
        currentStreak: 0
      }

      if (streakData.lastSolvedDate !== today) {

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split("T")[0]

        if (streakData.lastSolvedDate === yesterdayStr) {
          streakData.currentStreak += 1
        } else {
          streakData.currentStreak = 1
        }

        streakData.lastSolvedDate = today
        localStorage.setItem("streakData", JSON.stringify(streakData))
      }

      // 🔥 HEATMAP DATA
      let heatmap = JSON.parse(localStorage.getItem("heatmapData")) || {}
      heatmap[today] = (heatmap[today] || 0) + 1
      localStorage.setItem("heatmapData", JSON.stringify(heatmap))
    }
  }

  return (
    <div className="problem-detail-container">

      <div className="problem-left">
        <h2>{title}</h2>
        <p><b>Difficulty:</b> {difficulty}</p>
        <p><b>Topic:</b> {topic}</p>

        <p>{data?.description}</p>

        <h4>Example 1:</h4>
        <pre>
Input: {data?.examples[0].input}
Output: {data?.examples[0].output}
        </pre>

        <h4>Example 2:</h4>
        <pre>
Input: {data?.examples[1].input}
Output: {data?.examples[1].output}
        </pre>
      </div>

      <div className="problem-right">

        <p>Language: {selectedLanguage}</p>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button onClick={runCode}>Run Code</button>

        <div>
          <h4>Test Cases</h4>

          {data?.testCases.map((test, index) => (
            <div key={index}>
              <p><b>Input:</b> {test.input}</p>
              <p><b>Expected:</b> {test.expected}</p>

              {testResults[index] && (
                <p>
                  {testResults[index].status === "Passed"
                    ? "✅ Passed"
                    : "❌ Failed"}
                </p>
              )}
            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default ProblemDetail