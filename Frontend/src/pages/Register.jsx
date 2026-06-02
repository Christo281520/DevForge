import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/css/landing.css'
import '../components/css/auth.css'

const Register = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirm, setShowConfirm] = useState(false)

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // 🔥 REGISTER FUNCTION
  const handleSubmit = async () => {

    // EMPTY CHECK
    if (
      !form.username ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {

      setError("All fields are required")

      return
    }

    // EMAIL VALIDATION
    if (!form.email.includes("@")) {

      setError("Enter valid email")

      return
    }

    // PHONE VALIDATION
    if (form.phone.length !== 10) {

      setError("Phone must be 10 digits")

      return
    }

    // PASSWORD MATCH
    if (form.password !== form.confirmPassword) {

      setError("Passwords do not match")

      return
    }

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/api/register/',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password
          })
        }
      )

      const data = await response.json()

      console.log(data)

      // 🔥 SUCCESS
      if (data.id) {

        alert("Registration Successful 🔥")

        navigate("/login")

      } else {

        setError("Registration Failed")
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

        <h2>Create Account 🚀</h2>

        <p className="subtitle">
          Join DevForge
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

        {/* EMAIL */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="input"
        />

        {/* PHONE */}
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="text"
          placeholder="Phone Number"
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

        {/* CONFIRM PASSWORD */}
        <div className="password-field">

          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="input"
          />

          <span
            onClick={() =>
              setShowConfirm(!showConfirm)
            }
          >
            {showConfirm ? "🙈" : "👁"}
          </span>

        </div>

        {/* REGISTER BUTTON */}
        <button
          className="auth-btn"
          onClick={handleSubmit}
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="switch-text">

          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
          >
            Login
          </span>

        </p>

      </div>

    </div>
  )
}

export default Register