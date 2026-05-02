import React from 'react'
import { Link } from 'react-router-dom'
import "./css/footer.css"

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h3>DevForge</h3>
          <p>Build, practice and track your coding skills.</p>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/home">Home</Link>
          <Link to="/challenge">Challenges</Link>
          <Link to="/analytics">Analytics</Link>
        </div>

        {/* Explore */}
        <div className="footer-section">
          <h4>Explore</h4>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/learning">Learning</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Connect</h4>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">YouTube</a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 DevForge | Created by Christo
      </div>

    </footer>
  )
}
export default Footer