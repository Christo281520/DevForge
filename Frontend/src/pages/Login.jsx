import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/css/landing.css'
import '../components/css/auth.css'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    if (!form.email || !form.password) {
      setError("All fields are required")
      return
    }

    setError("")
    navigate("/home")
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

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="auth-card fade-in">

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to DevForge</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="input"
        />

        <div className="password-field">
          <input
            name="password"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input"
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <button className="auth-btn" onClick={handleSubmit}>
          Login
        </button>

        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </div>
    </div>
  )
}
export default Login