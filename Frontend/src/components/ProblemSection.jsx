import React, { useState } from 'react'
import ProblemCard from './ProblemCard'

const ProblemSection = () => {
  const [problems] = useState([
    {
      id:1,
      title:"Two Sum",
      difficulty:"Easy",
      topic:"Arrays"
    },
    {
      id:2,
      title:"Palindrome Number",
      difficulty:"Easy",
      topic:"Math"
    },
    {
      id:3,
      title:"Longest Substring",
      difficulty:"Medium",
      topic:"Strings"
    }
  ])
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Coding Problems
      </h2>
      <div className="row">
        {problems.map((problem)=>(
          <ProblemCard
            key={problem.id}
            title={problem.title}
            difficulty={problem.difficulty}
            topic={problem.topic}
          />
        ))}
      </div>
    </div>
  )
}
export default ProblemSection