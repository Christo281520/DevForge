import React, { useState } from 'react'
import ProblemCard from '../components/ProblemCard'
import '../components/css/challenge.css'

const Challenges = () => {

  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const languages = ["Python", "Java", "JavaScript", "C", "C++"]

  const problems = [
    { id:1, title:"Two Sum", difficulty:"Easy", topic:"Arrays", lang:"JavaScript" },
    { id:2, title:"Palindrome Number", difficulty:"Easy", topic:"Math", lang:"Python" },
    { id:3, title:"Valid Parentheses", difficulty:"Easy", topic:"Stack", lang:"Java" },
    { id:4, title:"Merge Two Sorted Lists", difficulty:"Easy", topic:"Linked List", lang:"C++" },
    { id:5, title:"3Sum", difficulty:"Medium", topic:"Arrays", lang:"JavaScript" },
    { id:6, title:"Container With Most Water", difficulty:"Medium", topic:"Two Pointers", lang:"Python" },
    { id:7, title:"Median of Two Sorted Arrays", difficulty:"Hard", topic:"Binary Search", lang:"Java" },
    { id:8, title:"Merge k Sorted Lists", difficulty:"Hard", topic:"Heap", lang:"C" },
    { id:9, title:"Trapping Rain Water", difficulty:"Hard", topic:"Stack", lang:"C++" },
    { id:10, title:"Longest Substring Without Repeating Characters", difficulty:"Medium", topic:"Strings", lang:"JavaScript" }
  ]

  const filteredProblems = problems.filter(p => p.lang === selectedLanguage)

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
                  title={problem.title}
                  difficulty={problem.difficulty}
                  topic={problem.topic}
                  language={problem.lang}
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