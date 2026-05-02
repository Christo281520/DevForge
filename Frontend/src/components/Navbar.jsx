import React from 'react'
import { NavLink } from 'react-router-dom'
import "./css/navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">DevForge</h2>
      </div>
      <div className="navbar-center">
        <NavLink to="/home" className="nav-item">
          Home
        </NavLink>
        <NavLink to="/challenge" className="nav-item">
          Challenges
        </NavLink>
        <NavLink to="/analytics" className="nav-item">
          Analytics
        </NavLink>
        <NavLink to="/leaderboard" className="nav-item">
          Leaderboard
        </NavLink>

        <NavLink to="/learning" className="nav-item">
          Learning
        </NavLink>
      </div>
      <div className="navbar-right"></div>
    </nav>
  )
}

export default Navbar