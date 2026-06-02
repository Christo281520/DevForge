import React, { useEffect, useState } from 'react'
import '../components/css/leaderboard.css'

const Leaderboard = () => {

  const [users, setUsers] = useState([])

  // 🔥 FETCH LEADERBOARD
  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/leaderboard/')

      .then((response) => response.json())

      .then((data) => {

        console.log(data)

        setUsers(data)

      })

      .catch((error) => {

        console.log(error)

      })

  }, [])

  // 🏆 MEDALS
  const getRankDisplay = (rank) => {

    if (rank === 1) return "🥇"

    if (rank === 2) return "🥈"

    if (rank === 3) return "🥉"

    return `#${rank}`
  }

  // 🔥 SCORE LOGIC
  const getScore = (user) => {

    return (
      user.solved_count * 10 +
      user.streak * 5
    )
  }

  return (

    <div className="leaderboard-container">

      <h2>🏆 Leaderboard</h2>

      <div className="leaderboard-list">

        {users.map((user, index) => (

          <div
            key={index}
            className={`leader-card ${
              user.rank <= 3
                ? "top-rank"
                : ""
            }`}
          >

            {/* 🏅 RANK */}
            <div className="rank">

              {getRankDisplay(user.rank)}

            </div>

            {/* 👤 USER */}
            <div className="user-info">

              <h4>{user.username}</h4>

              <p>

                {user.solved_count} solved

                {" • "}

                🔥 {user.streak}

              </p>

            </div>

            {/* ⭐ SCORE */}
            <div className="score">

              {getScore(user)}

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Leaderboard