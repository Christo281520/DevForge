import React, { useEffect, useState } from 'react'
import '../components/css/profile.css'

const Profile = () => {

  const [analytics, setAnalytics] = useState(null)

  const [profileImage, setProfileImage] = useState(null)

  const username =
    localStorage.getItem("username")

  const token =
    localStorage.getItem("token")

  // 🔥 FETCH ANALYTICS
  useEffect(() => {

    fetch(
      'http://127.0.0.1:8000/api/analytics/',
      {
        headers: {
          'Authorization':
            `Token ${token}`
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

  // 📸 IMAGE UPLOAD
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

    <div className="profile-container">

      {/* 👤 TOP */}
      <div className="profile-card">

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

        <h2>{username}</h2>

        <p>
          DevForge Developer 🚀
        </p>

      </div>

      {/* 📊 STATS */}
      <div className="profile-stats">

        <div className="stat-box">

          <h3>
            {analytics.solved_count}
          </h3>

          <p>Solved</p>

        </div>

        <div className="stat-box">

          <h3>
            {analytics.total_submissions}
          </h3>

          <p>Submissions</p>

        </div>

        <div className="stat-box">

          <h3>
            🔥 {analytics.streak}
          </h3>

          <p>Streak</p>

        </div>

      </div>

      {/* 💻 LANGUAGES */}
      <div className="profile-section">

        <h2>Languages Used</h2>

        <div className="language-grid">

          {analytics.language_stats.map(
            (lang, index) => (

              <div
                key={index}
                className="language-card"
              >

                <h3>{lang.language}</h3>

                <p>
                  {lang.total} submissions
                </p>

              </div>

            )
          )}

        </div>

      </div>

      {/* 🔥 RECENT */}
      <div className="profile-section">

        <h2>Recent Activity</h2>

        {analytics.recent_activity.map(
          (item, index) => (

            <div
              key={index}
              className="activity-card"
            >

              <h3>{item.problem}</h3>

              <p>
                {item.language}
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

export default Profile