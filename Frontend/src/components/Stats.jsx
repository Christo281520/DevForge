import React, { useEffect, useState } from 'react'
import './css/stats.css'

const Stats = () => {
  const statsData = [
    { target: 100, label: "Problems" },
    { target: 50, label: "Active Users" },
    { target: 10, label: "Topics" },
    { target: 20, label: "Challenges" }
  ]
  const [counts, setCounts] = useState(
    statsData.map(() => 0)
  )
  useEffect(() => {
    const intervals = statsData.map((item, index) => {
      let count = 0
      return setInterval(() => {
        count += Math.ceil(item.target / 50)
        if (count >= item.target) {
          count = item.target
          clearInterval(intervals[index])
        }
        setCounts(prev => {
          const newCounts = [...prev]
          newCounts[index] = count
          return newCounts
        })
      }, 30)
    })
    return () => intervals.forEach(clearInterval)
  }, [])
  return (
    <div className="stats-container">
      <div className="stats-grid">
        {statsData.map((item, index) => (
          <div key={index} className="stat-card">
            <h2>{counts[index]}+</h2>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Stats