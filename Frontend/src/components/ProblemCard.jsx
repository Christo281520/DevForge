import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/problemcard.css'

const ProblemCard = ({
  id,
  title,
  difficulty,
  topic,
  language
}) => {

  const navigate = useNavigate()

  const solvedProblems =
    JSON.parse(
      localStorage.getItem("solvedProblems")
    ) || []

  const isSolved =
    solvedProblems.includes(title)

  const getDifficultyClass = () => {

    if (difficulty === "Easy") return "easy"

    if (difficulty === "Medium") return "medium"

    return "hard"
  }

  const handleSolve = () => {

    navigate(`/problems/${id}`)
  }

  return (

    <div className="problem-row">

      {/* 🔥 LEFT */}
      <div className="problem-left-side">

        <div className="problem-title-row">

          <h3>
            {title}
            {isSolved && " ✅"}
          </h3>

          <span
            className={`difficulty-badge ${getDifficultyClass()}`}
          >
            {difficulty}
          </span>

        </div>

        <div className="problem-meta">

          <span>💻 {language}</span>

          <span>📚 {topic}</span>

        </div>

      </div>

      {/* 🚀 RIGHT */}
      <div className="problem-right-side">

        <button
          className="solve-btn"
          onClick={handleSolve}
        >
          Solve →
        </button>

      </div>

    </div>
  )
}

export default ProblemCard