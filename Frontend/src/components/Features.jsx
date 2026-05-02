import React from 'react'
import { FaCode, FaChartLine, FaTrophy, FaBook } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import "./css/features.css"

const Features = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <FaCode />,
      title: "Coding Challenges",
      desc: "Practice problems and improve problem-solving skills.",
      path: "/challenge",
      color: "#0d6efd"
    },
    { 
      icon: <FaChartLine />,
      title: "Skill Analytics",
      desc: "Track your coding performance and progress.",
      path: "/analytics",
      color: "#198754"
    },
    {
      icon: <FaTrophy />,
      title: "Leaderboard",
      desc: "Compare your ranking with other developers.",
      path: "/leaderboard",
      color: "#ffc107"
    },
    {
      icon: <FaBook />,
      title: "Learning",
      desc: "Learn Python, JavaScript and more.",
      path: "/learning",
      color: "#dc3545"
    }
  ]

  return (
    <div className="features-container">

      <h2>Platform Features</h2>

      <div className="features-grid">

        {features.map((item, index) => (
          <div
            key={index}
            className="feature-card"
            onClick={() => navigate(item.path)}
          >

            <div
              className="icon-circle"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <h5>{item.title}</h5>
            <p>{item.desc}</p>

            <span className="explore">Explore →</span>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Features