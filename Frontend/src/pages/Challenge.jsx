import React, { useState, useEffect } from 'react'
import ProblemCard from '../components/ProblemCard'
import '../components/css/challenge.css'

const Challenges = () => {

  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [problems, setProblems] = useState([])

  const languages = ["Python", "Java", "JavaScript", "C", "C++"]

  useEffect(() => {

  fetch('http://127.0.0.1:8000/api/problems/')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setProblems(data)
    })
    .catch((error) => {
      console.log(error)
    })

}, [])

  
  const filteredProblems = problems.filter(
  p => p.language === selectedLanguage
)

  return (
    <div className="challenge-container">

      {/* 🔥 FULL WIDTH WRAPPER */}
      <div className="challenge-wrapper">

        {/* LANGUAGE SELECT */}
        {!selectedLanguage && (
          <div className="language-section">

            <h2 className="title">Select Language</h2>

            <div className="language-grid">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="language-card"
                  onClick={() => setSelectedLanguage(lang)}
                >
                  <h4>{lang}</h4>
                  <p>Solve problems in {lang}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* PROBLEM LIST */}
        {selectedLanguage && (
          <div className="problem-section">

            <h2 className="title">{selectedLanguage} Challenges</h2>

            <button
              className="back-btn"
              onClick={() => setSelectedLanguage(null)}
            >
              ← Back
            </button>

            <div className="problem-grid">
              {filteredProblems.map(problem => (
                <ProblemCard
                  key={problem.id}
                  id={problem.id}
                  title={problem.title}
                  difficulty={problem.difficulty}
                  topic={problem.topic}
                  language={problem.language}
                />
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  )
}

export default Challenges