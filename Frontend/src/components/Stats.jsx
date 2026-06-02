import React, { useEffect, useState } from 'react'
import './css/stats.css'

const Stats = () => {

  const [statsData, setStatsData] = useState([])

  const [counts, setCounts] = useState([0, 0, 0, 0])

  // 🔥 FETCH STATS FROM BACKEND
  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/stats/')
      .then((response) => response.json())
      .then((data) => {

        const fetchedStats = [

          {
            target: data.problems,
            label: "📝 Problems"
          },

          {
            target: data.developers,
            label: "👨‍💻 Developers"
          },

          {
            target: data.languages,
            label: "🌐 Languages"
          },

          {
            target: data.challenges,
            label: "🏆 Challenges"
          }

        ]

        setStatsData(fetchedStats)

      })
      .catch((error) => {

        console.log(error)

      })

  }, [])

  // 🔥 COUNTING ANIMATION
  useEffect(() => {

    if (statsData.length === 0) return

    const intervals = statsData.map((item, index) => {

      let count = 0

      return setInterval(() => {

        count += Math.ceil(item.target / 40)

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

  }, [statsData])

  return (

    <div className="stats-container">

      <div className="stats-grid">

        {statsData.map((item, index) => (

          <div
            key={index}
            className="stat-card"
          >

            <h2>
              {counts[index]}
            </h2>

            <p>
              {item.label}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Stats