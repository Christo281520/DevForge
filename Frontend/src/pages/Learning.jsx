import React from "react"
import { useNavigate } from "react-router-dom"
import "../components/css/learning.css"

const Learning = () => {

  const navigate = useNavigate()

  const languages = [
    { name: "Python", icon: "🐍", route: "/learning/python" },
    { name: "Java", icon: "☕", route: "/learning/java" },
    { name: "C", icon: "⚙️", route: "/learning/c" },
    { name: "C++", icon: "🚀", route: "/learning/cpp" },
    { name: "JavaScript", icon: "🌐", route: "/learning/js" }
  ]

  return (
    <div className="learning-home">

      {/* 🔝 HEADER */}
      <div className="learning-header">
        <h1>Start Learning</h1>
        <p>
          Learn programming languages step by step with examples and practice.
        </p>
      </div>

      {/* 🌐 LANGUAGE CARDS */}
      <div className="language-grid">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="language-card"
            onClick={() => navigate(lang.route)}
          >
            <div className="icon">{lang.icon}</div>
            <h3>{lang.name}</h3>
            <p>Start learning {lang.name}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Learning