import React, { useEffect, useState } from 'react'
import '../components/css/analytics.css'

const Analytics = () => {

  const [analytics, setAnalytics] = useState(null)

  const [animatedPercent, setAnimatedPercent] = useState(0)

  const [profileImage, setProfileImage] = useState(null)

  const token = localStorage.getItem("token")

  // 🔥 FETCH ANALYTICS
  useEffect(() => {

    fetch(
      'http://127.0.0.1:8000/api/analytics/',
      {
        headers: {
          'Authorization': `Token ${token}`
        }
      }
    )
      .then((response) => response.json())

      .then((data) => {

        console.log(data)

        setAnalytics(data)

      })

      .catch((error) => {

        console.log(error)

      })

    // 🔥 PROFILE IMAGE
    const savedImage =
      localStorage.getItem("profileImage")

    if (savedImage) {

      setProfileImage(savedImage)
    }

  }, [])

  // 🔥 ANIMATE SUCCESS RATE
  useEffect(() => {

    if (!analytics) return

    let start = 0

    const interval = setInterval(() => {

      start++

      if (start >= analytics.success_rate) {

        start = analytics.success_rate

        clearInterval(interval)
      }

      setAnimatedPercent(start)

    }, 15)

    return () => clearInterval(interval)

  }, [analytics])

  // 📸 PROFILE IMAGE
  const handleImageUpload = (e) => {

    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {

      setProfileImage(reader.result)

      localStorage.setItem(
        "profileImage",
        reader.result
      )
    }

    reader.readAsDataURL(file)
  }

  // 🔥 LOADING
  if (!analytics) {

    return <h1>Loading...</h1>
  }

  return (

    <div className="analytics-container">

      {/* 🔝 TOP ROW */}
      <div className="top-row">

        {/* 👤 PROFILE */}
        <div className="profile-box">

          <div className="avatar">

            {profileImage ? (

              <img
                src={profileImage}
                alt="profile"
              />

            ) : (

              <span>👤</span>

            )}

            <input
              type="file"
              onChange={handleImageUpload}
            />

          </div>

          <h3>User</h3>

          <p>
            {analytics.solved_count} solved
          </p>

          <p className="streak">
            🔥 {analytics.streak} day streak
          </p>

        </div>

        {/* 🔵 SUCCESS RATE */}
        <div className="circle-box">

          <div className="circle">

            {animatedPercent}%

          </div>

          <p className="circle-label">
            Success Rate
          </p>

        </div>

      </div>

      {/* 📊 STATS */}
      <div className="stats-grid">

        <div className="stat-card">

          <h3>Total Submissions</h3>

          <p>{analytics.total_submissions}</p>

        </div>

        <div className="stat-card">

          <h3>Passed</h3>

          <p>{analytics.passed_count}</p>

        </div>

        <div className="stat-card">

          <h3>Failed</h3>

          <p>{analytics.failed_count}</p>

        </div>

      </div>

      {/* 💻 LANGUAGE STATS */}
      <div className="language-section">

        <h2>Languages Used 💻</h2>

        <div className="language-grid">

          {analytics.language_stats.map(
            (lang, index) => (

              <div
                key={index}
                className="language-card"
              >

                <h3>{lang.language}</h3>

                <p>{lang.total} submissions</p>

              </div>

            )
          )}

        </div>

      </div>

      {/* 🔥 RECENT ACTIVITY */}
      <div className="activity-section">

        <h2>Recent Activity 🔥</h2>

        {analytics.recent_activity.map(
          (item, index) => (

            <div
              key={index}
              className="activity-card"
            >

              <h3>{item.problem}</h3>

              <p>
                💻 {item.language}
              </p>

              <p>
                {item.status === "Passed"
                  ? "✅ Passed"
                  : "❌ Failed"}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  )
}

export default Analytics