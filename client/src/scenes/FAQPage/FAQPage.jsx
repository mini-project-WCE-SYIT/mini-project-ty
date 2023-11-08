import React from 'react'
import ReactPlayer from 'react-player'
import './FAQPage.css'
import Navbar from 'scenes/navbar'

const FAQPage = () => {
  const [dropDown1, setDropDown1] = React.useState(true)
  const [dropDown2, setDropDown2] = React.useState(true)
  const [dropDown3, setDropDown3] = React.useState(true)
  const [dropDown4, setDropDown4] = React.useState(true)
  return (
    <div>
      <Navbar />
      <div className='rules'>
        <center>
          <h1>
            <b>WCE ACHIEVO Guide</b>
          </h1>
        </center>
        <p>
          WCE ACHIEVO is a platform designed for our college where students and
          teachers can post their extracurricular activities and achievements
          that represent our college in various ways, such as certificates,
          guest lectures, and more.
          <br />
          <br />
          WCE ACHIEVO primarily exists to highlight and celebrate the
          achievements and activities of both students and teachers at our
          college. These achievements go beyond regular academic performance and
          encompass various endeavors that contribute to the reputation and
          standing of our institution.
          <br />
          <span style={{ fontWeight: 'bolder' }}>
            {' '}
            Start sharing your achievements, let your colleagues know about you
          </span>
          <br />
          <br />
        </p>

        <ul>
          <li>
            <input
              type='checkbox'
              className='checkbox-input'
              onClick={() => setDropDown1(!dropDown1)}
              checked={dropDown1}
            />
            <i className='icon'></i>
            <h2>Who can use WCE ACHIEVO?</h2>
            <p>
              WCE ACHIEVO is open to both students and teachers of our college.
              They can use the platform to showcase their activities that
              contribute to the college's reputation.
            </p>
          </li>
          <li>
            <input
              type='checkbox'
              onClick={() => setDropDown2(!dropDown2)}
              checked={dropDown2}
            />
            <i></i>
            <h2> How can I post my activities on WCE ACHIEVO?</h2>
            <p>
              To post your activities, log in to your account, and navigate to
              the "Submit Activity" or "Export Activity" button. Fill in the
              required information and details about your activity, then submit
              it for review.
            </p>
          </li>
          <li>
            <input
              type='checkbox'
              onClick={() => setDropDown3(!dropDown3)}
              checked={dropDown3}
            />
            <i></i>
            <h2>What kind of activities can I post on WCE ACHIEVO?</h2>
            <p>
              You can post activities that represent our college positively
              outside the campus. This includes certificates, participation in
              competitions, organizing or attending guest lectures, and any
              other achievements that showcase our college's excellence.
            </p>
          </li>
          <li>
            <input
              type='checkbox'
              onClick={() => setDropDown4(!dropDown4)}
              checked={dropDown4}
            />
            <i></i>
            <h2> When should I submit my activity report?</h2>
            <p>
              Teachers are required to submit their activity reports by the end
              of every month. This ensures that all recent achievements are
              documented and considered for grading.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FAQPage
