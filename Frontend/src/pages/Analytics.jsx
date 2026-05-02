import React, { useEffect, useState } from 'react'
import '../components/css/analytics.css'

const Analytics = () => {

  const [stats, setStats] = useState({ total: 0, solved: 0 })
  const [animatedPercent, setAnimatedPercent] = useState(0)
  const [profileImage, setProfileImage] = useState(null)
  const [streak, setStreak] = useState(0)
  const [heatmapData, setHeatmapData] = useState({})

  const problems = [
    "Two Sum",
    "Palindrome Number",
    "Valid Parentheses",
    "Merge Two Sorted Lists",
    "3Sum",
    "Container With Most Water",
    "Median of Two Sorted Arrays",
    "Merge k Sorted Lists",
    "Trapping Rain Water",
    "Longest Substring Without Repeating Characters"
  ]

  useEffect(() => {

    const solvedProblems = JSON.parse(localStorage.getItem("solvedProblems")) || []
    const savedImage = localStorage.getItem("profileImage")
    const streakData = JSON.parse(localStorage.getItem("streakData"))
    const heatmap = JSON.parse(localStorage.getItem("heatmapData")) || {}

    if (savedImage) setProfileImage(savedImage)
    if (streakData) setStreak(streakData.currentStreak)

    setHeatmapData(heatmap)

    setStats({
      total: problems.length,
      solved: solvedProblems.length
    })

  }, [])

  const percent = stats.total
    ? Math.round((stats.solved / stats.total) * 100)
    : 0

  // 🔥 animate %
  useEffect(() => {
    let start = 0
    const interval = setInterval(() => {
      start++
      if (start >= percent) {
        start = percent
        clearInterval(interval)
      }
      setAnimatedPercent(start)
    }, 15)

    return () => clearInterval(interval)
  }, [percent])

  // 📸 upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImage(reader.result)
      localStorage.setItem("profileImage", reader.result)
    }
    reader.readAsDataURL(file)
  }

  // 📅 last 30 days
  const getLast30Days = () => {
    const days = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      days.push(d.toISOString().split("T")[0])
    }
    return days
  }

  const days = getLast30Days()

  return (
    <div className="analytics-container">

      {/* 🔝 TOP ROW */}
      <div className="top-row">

        {/* 👤 PROFILE */}
        <div className="profile-box">

          <div className="avatar">
            {profileImage ? (
              <img src={profileImage} alt="profile" />
            ) : (
              <span>👤</span>
            )}

            <input type="file" onChange={handleImageUpload} />
          </div>

          <h3>User</h3>
          <p>{stats.solved} / {stats.total} solved</p>
          <p className="streak">🔥 {streak} day streak</p>

        </div>

        {/* 🔵 CIRCLE */}
        <div className="circle-box">
          <div className="circle">
            {animatedPercent}%
          </div>
        </div>

      </div>

      {/* 📅 HEATMAP */}
      <div className="heatmap-section">

        <h3>Activity</h3>

        <div className="heatmap">

          {days.map((day, i) => {
            const val = heatmapData[day] || 0

            let level = "l0"
            if (val === 1) level = "l1"
            else if (val === 2) level = "l2"
            else if (val >= 3) level = "l3"

            return (
              <div
                key={i}
                className={`box ${level}`}
                title={`${day} → ${val} solved`}
              />
            )
          })}

        </div>

      </div>

    </div>
  )
}

export default Analytics