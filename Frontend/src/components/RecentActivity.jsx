import React, { useEffect, useState } from 'react'
import './css/recentActivity.css'

const RecentActivity = () => {

  const [activities, setActivities] = useState([])

  useEffect(() => {

    const token = localStorage.getItem("token")

    fetch(
      "http://127.0.0.1:8000/api/submissions/",
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {

        setActivities(data.slice(0, 5))

      })
      .catch(err => {

        console.log(err)

      })

  }, [])

  return (

    <div className="activity-container">

      <h2>
        Recent Activity
      </h2>

      <div className="activity-card">

        {activities.length > 0 ? (

          activities.map((item) => (

            <div
              key={item.id}
              className="activity-item"
            >

              <span>

                {item.status === "Passed"
                  ? "✅"
                  : "❌"}

              </span>

              <span>
                {item.problem_title || `Problem #${item.problem}`}
              </span>

            </div>

          ))

        ) : (

          <p>
            No recent activity yet.
          </p>

        )}

      </div>

    </div>

  )
}

export default RecentActivity