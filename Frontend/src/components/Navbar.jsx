import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSearch, FaUserCircle } from 'react-icons/fa'
import "./css/navbar.css"

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)

  const username =
    localStorage.getItem("username") || "User"

  const [searchTerm, setSearchTerm] = useState("")
  const [problems, setProblems] = useState([])

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/problems/")
      .then((response) => response.json())
      .then((data) => {

        setProblems(data)

      })
      .catch((error) => {

        console.log(error)

      })

  }, [])

  const filteredProblems = problems.filter((problem) =>

    problem.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    problem.topic
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    problem.language
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

  )

  return (

    <nav className="navbar">

      {/* LOGO */}
      <div className="navbar-left">

        <h2 className="logo">
          DevForge
        </h2>

      </div>

      {/* NAVIGATION */}
      <div className="navbar-center">

        <NavLink
          to="/home"
          className="nav-item"
        >
          Home
        </NavLink>

        <NavLink
          to="/challenge"
          className="nav-item"
        >
          Challenges
        </NavLink>

        <NavLink
          to="/submissions"
          className="nav-item"
        >
          Submissions
        </NavLink>

        <NavLink
          to="/analytics"
          className="nav-item"
        >
          Analytics
        </NavLink>

        <NavLink
          to="/leaderboard"
          className="nav-item"
        >
          Leaderboard
        </NavLink>

        <NavLink
          to="/learning"
          className="nav-item"
        >
          Learning
        </NavLink>

      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-right">

        {/* SEARCH */}
        <div className="search-wrapper">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>

          {searchTerm && (

            <div className="search-results">

              {filteredProblems.length > 0 ? (

                filteredProblems.map((problem) => (

                  <div
                    key={problem.id}
                    className="search-item"
                    onClick={() => {

                      navigate(
                        `/problems/${problem.id}`
                      )

                      setSearchTerm("")

                    }}
                  >

                    <div>

                      {problem.title}

                    </div>

                    <span>

                      {problem.language}

                    </span>

                  </div>

                ))

              ) : (

                <div className="search-item">

                  No problems found

                </div>

              )}

            </div>

          )}

        </div>

        {/* PROFILE */}
        <div
          className="profile-wrapper"
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >

          <div className="profile-mini">

            <FaUserCircle />

            <span>
              {username} ▼
            </span>

          </div>

          {showMenu && (

            <div className="profile-dropdown">

              <div
                className="dropdown-item"
                onClick={() => {

                  setShowMenu(false)

                  navigate("/profile")

                }}
              >
                My Profile
              </div>

              <div
                className="dropdown-item logout"
                onClick={() => {

                  localStorage.clear()

                  setShowMenu(false)

                  navigate("/login")

                }}
              >
                Logout
              </div>

            </div>

          )}

        </div>

      </div>

    </nav>

  )
}

export default Navbar