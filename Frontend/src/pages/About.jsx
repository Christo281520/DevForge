import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/css/about.css'

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="about-bg">
      <div className="about-overlay">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <div className="about-content fade-in">
          <h1 className="about-title">What is DevForge?</h1>
          <p>
            DevForge is a developer skill evaluation platform designed to help you
            practice coding, track your performance, and improve your skills
            systematically.
          </p>
          <p>
            Unlike traditional platforms, DevForge focuses on performance analytics
            such as accuracy, solving time, and consistency.
          </p>
          <p>
            It provides features like coding challenges, skill analytics,
            leaderboards, and learning modules to help you grow as a developer.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About