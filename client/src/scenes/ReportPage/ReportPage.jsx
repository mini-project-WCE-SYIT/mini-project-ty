import React, { useState, useEffect } from 'react'
import Navbar from 'scenes/navbar'
import { useSelector } from 'react-redux'
import './ReportPage.css'

const ReportPage = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const { _id } = useSelector((state) => state.user)
  const [data, setData] = useState([])
  const token = useSelector((state) => state.token)

  const getReportPosts = async (start, end) => {
    const stDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    const stFormattedDate = stDateObj.toISOString().split('T')[0]
    const enFormattedDate = endDateObj.toISOString().split('T')[0]
    console.log('start and end dates are', stFormattedDate, enFormattedDate)
    console.log(_id)
    const response = await fetch(
      `${process.env.REACT_APP_URL}/posts/timeframe/${stFormattedDate}/${enFormattedDate}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data1 = await response.json()
    setData(data1)
    console.log(data1)

    const downloadPdfResponse = await fetch(
      `${process.env.REACT_APP_URL}/generate-pdf/${_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (downloadPdfResponse.ok) {
      console.log(downloadPdfResponse)
      setPdfUrl(downloadPdfResponse.url)
    } else {
      console.error('Failed to generate PDF')
    }
  }

  //get the overall report
  const handleReport = () => {
    const stDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    const stISO = stDateObj.toISOString()
    const enISO = endDateObj.toISOString()
    console.log(stISO, enISO)
    getReportPosts(stISO, enISO)
  }

  return (
    <>
      <Navbar />
      <div className='date'>
        <div className='fromDate'>
          <p>From</p>
          <input
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value)
            }}
            type='date'
            placeholder='Start date'
          />
        </div>
        <div className='toDate'>
          <p>To</p>
          <input
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value)
            }}
            type='date'
            placeholder='End date'
          />
        </div>
      </div>
      <div className='btn'>
        <button className='btn' onClick={handleReport}>
          Generate Report
        </button>
      </div>
      <div className='tbContainer'>
        <table className='report-table'>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Event Name</th>
              <th>Activity Type</th>
              <th>Location</th>
              <th>Details</th>
              <th>Organised By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.eventName}</td>
                <td>{item.activityType}</td>
                <td>{item.location}</td>
                <td>{item.description}</td>
                <td>{item.organisedBy || item.organizedBy}</td>
                <td>{item.endDate || item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='btnContainer'>
          <a
            href={pdfUrl}
            className='btn-download'
            target='_blank'
            rel='noreferrer'
          >
            View PDF
          </a>
        </div>
      </div>
    </>
  )
}

export default ReportPage
