import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/css/landing.css'
import '../components/css/auth.css'
const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError("All fields are required")
      return
    }

    if (!form.email.includes("@")) {
      setError("Enter a valid email")
      return
    }

    if (form.phone.length !== 10) {
      setError("Phone must be 10 digits")
      return
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setError("")
    navigate("/login")
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

        <h2>Create Account 🚀</h2>
        <p className="subtitle">Join DevForge</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input name="name" onChange={handleChange} type="text" placeholder="Full Name" className="input" />
        <input name="email" onChange={handleChange} type="email" placeholder="Email" className="input" />
        <input name="phone" onChange={handleChange} type="text" placeholder="Phone Number" className="input" />

        {/* Password */}
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

        {/* Confirm Password */}
        <div className="password-field">
          <input
            name="confirmPassword"
            onChange={handleChange}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="input"
          />
          <span onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? "🙈" : "👁"}
          </span>
        </div>

        <button className="auth-btn" onClick={handleSubmit}>
          Register
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  )
}
export default Register