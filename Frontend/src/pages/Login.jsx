import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/css/landing.css'
import '../components/css/auth.css'

const Login = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const [error, setError] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // 🔥 LOGIN FUNCTION
  const handleSubmit = async () => {

    if (!form.username || !form.password) {

      setError("All fields are required")

      return
    }

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/api/login/',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            username: form.username,
            password: form.password
          })
        }
      )

      const data = await response.json()

      console.log(data)

      // 🔥 LOGIN SUCCESS
      if (data.token) {

        localStorage.setItem('token', data.token)

        localStorage.setItem('username', data.username)

        alert("Login Successful 🔥")

        navigate("/home")

      } else {

        setError("Invalid Credentials")
      }

    } catch (error) {

      console.log(error)

      setError("Something went wrong")
    }
  }

  return (

    <div className="landing-container">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="particles">

        {[...Array(20)].map((_, i) => (
          <span key={i}></span>
        ))}

      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <div className="auth-card fade-in">

        <h2>Welcome Back 👋</h2>

        <p className="subtitle">
          Login to DevForge
        </p>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* USERNAME */}
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          type="text"
          placeholder="Username"
          className="input"
        />

        {/* PASSWORD */}
        <div className="password-field">

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input"
          />

          <span
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? "🙈" : "👁"}
          </span>

        </div>

        {/* LOGIN BUTTON */}
        <button
          className="auth-btn"
          onClick={handleSubmit}
        >
          Login
        </button>

        {/* REGISTER LINK */}
        <p className="switch-text">

          Don’t have an account?{" "}

          <span
            onClick={() => navigate("/Register")}
          >
            Register
          </span>

        </p>

      </div>

    </div>
  )
}

export default Login