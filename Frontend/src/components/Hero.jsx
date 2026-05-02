import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/hero.css'

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="hero-image">
      <div className="hero-overlay">
        <h1>Build Your Coding Skills</h1>
        <p>
          Practice problems, track performance, and grow as a developer.
        </p>
        <button onClick={() => navigate("/challenge")}>
          Start Practicing
        </button>
      </div>
    </div>
  )
}
export default Hero