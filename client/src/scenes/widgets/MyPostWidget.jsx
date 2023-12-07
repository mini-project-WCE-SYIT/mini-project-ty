import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import CurriForm from './CurriForm'
import CoCurriForm from './CoCurriForm'
import ExCurriForm from './ExCurriForm'
import Navbar from '../navbar/index'
import './MyPostWidget.css'
import { Height } from '@mui/icons-material'

const MyPostWidget = () => {
  const [isAchieved, setIsAchieved] = useState(0)
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(null)
  const [eventName, setEventName] = useState('')
  const [activityType, setActivityType] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [organizedBy, setOrganizedBy] = useState('')
  const { palette } = useTheme()
  const { _id, picturePath } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium

  const handlePost = async () => {
    const formData = new FormData()
    formData.append('userId', _id)
    formData.append('description', shortDescription)
    formData.append('eventName', eventName)
    formData.append('activityType', activityType)
    formData.append('location', location)
    formData.append('date', date)
    formData.append('organizedBy', organizedBy)
    if (image) {
      formData.append('picture', image)
      formData.append('picturePath', image.name)
    }

    const response = await fetch(`${process.env.REACT_APP_URL}/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const posts = await response.json()
    dispatch(setPosts({ posts }))
    setImage(null)
    setEventName('')
    setActivityType('')
    setShortDescription('')
    setLocation('')
    setDate('')
    setOrganizedBy('')
  }

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='achievement-selection'>
          <p>Please select the type of achievement you want to post about</p>
          <div className='buttons'>
            <button
              className={`button curricular ${
                isAchieved === 1 ? 'active' : 'inactive'
              }`}
              onClick={() => {
                setIsAchieved(1)
              }}
            >
              Curricular
            </button>
            <button
              className={`button extracurricular ${
                isAchieved === 3 ? 'active' : 'inactive'
              }`}
              onClick={() => {
                setIsAchieved(3)
              }}
            >
              Extra Curricular
            </button>
            <button
              className={`button cocurricular ${
                isAchieved === 2 ? 'active' : 'inactive'
              }`}
              onClick={() => {
                setIsAchieved(2)
              }}
            >
              Co-Curricular
            </button>
          </div>
        </div>
      </div>
      {isAchieved === 1 && <CurriForm picturePath={picturePath} />}
      {isAchieved === 2 && <CoCurriForm picturePath={picturePath} />}
      {isAchieved === 3 && <ExCurriForm picturePath={picturePath} />}
    </div>
  )
}

export default MyPostWidget
