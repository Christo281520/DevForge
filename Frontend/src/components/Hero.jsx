import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/hero.css'

const Hero = () => {

  const navigate = useNavigate()

  const username =
    localStorage.getItem("username")

  const streakData =
    JSON.parse(
      localStorage.getItem("streakData")
    ) || {
      currentStreak: 0
    }

  const solvedProblems =
    JSON.parse(
      localStorage.getItem("solvedProblems")
    ) || []

  return (

    <div className="hero-image">

      <div className="hero-overlay">

        {/* 🔥 TOP WELCOME */}
        <div className="hero-top">

          <div className="hero-user">

            <h2>
              Welcome back,
              {" "}
              {username} 👋
            </h2>

            <p>
              Ready to solve more
              problems today? 🚀
            </p>

          </div>

          <div className="hero-stats">

            <div className="hero-stat-card">

              <h3>
                🔥 {streakData.currentStreak}
              </h3>

              <span>Day Streak</span>

            </div>

            <div className="hero-stat-card">

              <h3>
                ✅ {solvedProblems.length}
              </h3>

              <span>Solved</span>

            </div>

          </div>

        </div>

        {/* 🔥 CENTER CONTENT */}
        <div className="hero-content">

          <h1>
            Build Your Coding Skills
          </h1>
          <p className="hero-mini-stats">
            19 Problems • 5 Languages • 4 Ranked Developers
          </p>

          <p>
            Practice problems,
            track performance,
            and grow as a developer.
          </p>

          <button
            onClick={() =>
              navigate("/challenge")
            }
          >
            Start Practicing
          </button>

        </div>

      </div>

    </div>
  )
}

export default Hero