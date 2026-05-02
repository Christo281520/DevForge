import React, { useEffect, useState } from 'react'
import '../components/css/leaderboard.css'

const Leaderboard = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {

    const solvedProblems = JSON.parse(localStorage.getItem("solvedProblems")) || []
    const streakData = JSON.parse(localStorage.getItem("streakData")) || { currentStreak: 0 }

    const currentUser = {
      name: "You",
      solved: solvedProblems.length,
      streak: streakData.currentStreak,
    }

    currentUser.score = currentUser.solved * 10 + currentUser.streak * 5

    const dummyUsers = [
      { name: "Alice", solved: 8, streak: 5 },
      { name: "Bob", solved: 6, streak: 2 },
      { name: "Charlie", solved: 9, streak: 7 },
      { name: "David", solved: 4, streak: 1 }
    ]

    dummyUsers.forEach(u => {
      u.score = u.solved * 10 + u.streak * 5
    })

    const allUsers = [currentUser, ...dummyUsers]
    allUsers.sort((a, b) => b.score - a.score)

    setUsers(allUsers)

  }, [])

  // 🏆 Medal Logic
  const getRankDisplay = (index) => {
    if (index === 0) return "🥇"
    if (index === 1) return "🥈"
    if (index === 2) return "🥉"
    return `#${index + 1}`
  }

  return (
    <div className="leaderboard-container">

      <h2>🏆 Leaderboard</h2>

      <div className="leaderboard-list">

        {users.map((user, index) => (
          <div
            key={index}
            className={`leader-card ${index < 3 ? "top-rank" : ""}`}
          >

            <div className="rank">
              {getRankDisplay(index)}
            </div>

            <div className="user-info">
              <h4>{user.name}</h4>
              <p>{user.solved} solved • 🔥 {user.streak}</p>
            </div>

            <div className="score">
              {user.score}
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Leaderboard