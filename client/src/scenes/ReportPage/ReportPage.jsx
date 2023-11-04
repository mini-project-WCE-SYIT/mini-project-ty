import React,{useState} from 'react'
import Navbar from 'scenes/navbar'
import './ReportPage.css'
const ReportPage = () => {

  const [startDate,setStartDate]=useState()
  const [endDate,setEndDate]=useState()
  const [data,setData]=useState()
  const getReportPosts = async (start,end) => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/posts/timeframe/${start}/${end}`,
      {
        method: "GET"
      }
    );
    const data1 = await response.json();
    setData(data1)
    console.log(data)
    // dispatch(setPosts({ posts: data }));
  };
  const handleReport = () =>{
    const stDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const stISO = stDateObj.toISOString();
    const enISO = endDateObj.toISOString();
    console.log(stISO, enISO);
    getReportPosts(stISO,enISO);
  }
  

  return (
    <>
      <Navbar />
      <div className="date">
        <div className="fromDate">
          <p>From</p>
          <input value={startDate} onChange={(e)=>{
            setStartDate(e.target.value);
          }} type="date" placeholder='Start date' />
        </div>
        <div className="toDate">
          <p>To</p>
          <input value={endDate} onChange={(e)=>{
            setEndDate(e.target.value);
          }} type="date" placeholder='End date' />
        </div>
      </div>
      <div className="btn">
        <button className='btn' onClick={handleReport}>Generate Report</button>
      </div>
      <table>
        {/* <tbody> */}
        <th>
          <td>Sr. No.</td>
          <td>Event Name</td>
          <td>Activity Type</td>
          <td>Location</td>
          <td>Details</td>
          <td>Organised By</td>
          <td>Date</td>
        </th>
        {/* <tbody> */}
          {data?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.eventName}</td>
            <td>{item.activityType}</td>
            <td>{item.location}</td>
            <td>{item.shortDescription}</td>
            <td>{item.organisedBy}</td>
            <td>{item.date}</td>
          </tr>
        ) )}
  {/* </tbody>   */}
      </table>
    </>
  )
}

export default ReportPage