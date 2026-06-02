import React, { useEffect, useState } from 'react'
import '../components/css/submissions.css'

const Submissions = () => {

  const [submissions, setSubmissions] = useState([])

  const token =
    localStorage.getItem("token")

  useEffect(() => {

    fetch(
      'http://127.0.0.1:8000/api/submissions/',
      {
        headers: {
          'Authorization':
            `Token ${token}`
        }
      }
    )

      .then((response) =>
        response.json()
      )

      .then((data) => {

        console.log(data)

        setSubmissions(data)

      })

      .catch((error) => {

        console.log(error)

      })

  }, [])

  return (

    <div className="submissions-container">

      <h1>
        Submission History
      </h1>

      {submissions.length === 0 ? (

        <div className="empty-state">

          <h2>
            No submissions yet 🚀
          </h2>

          <p>
            Start solving problems
            to see your history.
          </p>

        </div>

      ) : (

        <div className="submission-list">

          {submissions.map(
            (submission, index) => (

              <div
                key={index}
                className="submission-card"
              >

                {/* 🔥 LEFT */}
                <div className="submission-left">

                  <h2>
                    {
                      submission.problem_title
                    }
                  </h2>

                  <div className="submission-meta">

                    <span className="language-pill">

                      {
                        submission.language
                      }

                    </span>

                    <span>

                      {
                        new Date(
                          submission.created_at
                        ).toLocaleString()
                      }

                    </span>

                  </div>

                </div>

                {/* 🔥 RIGHT */}
                <div
                  className={
                    submission.status === "Passed"
                      ? "status passed"
                      : "status failed"
                  }
                >

                  {submission.status}

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  )
}

export default Submissions