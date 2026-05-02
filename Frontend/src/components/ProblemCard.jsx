import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/problemcard.css'

const ProblemCard = ({ title, difficulty, topic, language }) => {

  const navigate = useNavigate()

  const getDifficultyClass = () => {
    if (difficulty === "Easy") return "easy"
    if (difficulty === "Medium") return "medium"
    return "hard"
  }

  const getBorderClass = () => {
    if (difficulty === "Easy") return "easy-border"
    if (difficulty === "Medium") return "medium-border"
    return "hard-border"
  }
  const solvedProblems = JSON.parse(localStorage.getItem("solvedProblems")) || []
  const isSolved = solvedProblems.includes(title)

  const handleSolve = () => {
    navigate("/problem", {
      state: { title, difficulty, topic, language }
    })
  }

  return (
    <div className="problem-grid">
      <div className={`problem-card ${getBorderClass()} ${isSolved ? "solved-card" : ""}`}>

        <div>
          <div className="problem-header">
            <h5>
              {title} {isSolved && "✅"}
            </h5>
            <span className={`badge ${getDifficultyClass()}`}>
              {difficulty}
            </span>
          </div>

          <p className="topic">Topic: {topic}</p>
          <p className="stats">👥 1200 solved • ✅ 65%</p>
        </div>

        <div className="problem-footer">
          <button className="solve-btn" onClick={handleSolve}>
            Solve →
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProblemCard