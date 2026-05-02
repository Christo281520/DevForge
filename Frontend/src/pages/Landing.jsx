import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/css/landing.css'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="landing-container auth-page">

      {/* Blur Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
            <span key={i}></span>
        ))}
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Content */}
      <div className="overlay fade-in">

        <h1 className="title">DevForge</h1>

        <p className="subtitle">
          Build. Practice. Track your coding skills.
        </p>

        <div className="buttons">
          <button
            className="btn btn-light me-3"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn btn-outline-light"
            onClick={() =>navigate("/about")}
          >
            What is this?
          </button>
        </div>

      </div>

    </div>
  )
}

export default Landing