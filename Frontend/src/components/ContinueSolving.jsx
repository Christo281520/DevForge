import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/continueSolving.css'

const ContinueSolving = () => {

  const navigate = useNavigate()

  const solvedProblems =
    JSON.parse(
      localStorage.getItem("solvedProblems")
    ) || []

  const lastProblem =
    solvedProblems.length > 0
      ? solvedProblems[solvedProblems.length - 1]
      : null

  return (

    <div className="continue-container">

      <h2>
        Continue Solving
      </h2>

      {lastProblem ? (

        <div className="continue-card">

          <div>

            <h3>
              {lastProblem}
            </h3>

            <p>
              Resume your coding journey 🚀
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/challenge")
            }
          >
            Resume
          </button>

        </div>

      ) : (

        <div className="continue-card">

          <div>

            <h3>
              No solved problems yet
            </h3>

            <p>
              Start your first challenge 🚀
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/challenge")
            }
          >
            Start
          </button>

        </div>

      )}

    </div>

  )
}

export default ContinueSolving