import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material'
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
import FlexBetween from 'components/FlexBetween'
import Dropzone from 'react-dropzone'
import UserImage from 'components/UserImage'
import WidgetWrapper from 'components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import FlexCol from 'components/FlexColm'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import './CurriForm.css'

const CurriForm = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(null)
  const [eventName, setEventName] = useState('')
  const [activityType, setActivityType] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setstartDate] = useState('')
  const [endDate, setendDate] = useState('')
  const [titleOfAchievement, setTitleOfAchievement] = useState('')
  const [titleOfProject, setTitleOfProject] = useState('')
  const [organizedBy, setOrganizedBy] = useState('')
  const { palette } = useTheme()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px')
  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium

  const handlePost = async () => {
    const formData = new FormData()
    formData.append('userId', _id)
    formData.append('description', shortDescription)
    formData.append('eventName', eventName)
    formData.append('activityType', activityType)
    formData.append('location', location)
    formData.append('startDate', startDate)
    formData.append('endDate', endDate)
    formData.append('organizedBy', organizedBy)
    formData.append('titleOfAchievement', titleOfAchievement)
    formData.append('titleOfProject', titleOfProject)
    if (image) {
      formData.append('picture', image)
      formData.append('picturePath', image.name)
    }
    console.log(formData)
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
    setstartDate('')
    setendDate('')
    setOrganizedBy('')
    setTitleOfAchievement('')
    setTitleOfProject('')
  }

  const handleActivityTypeChange = (event) => {
    setActivityType(event.target.value)
  }

  return (
    <div className='curri-form'>
      <div className='widget-wrapper'>
        <FlexCol gap='1.5rem'>
          <UserImage image={picturePath} />
          <FlexBetween gap='8rem'>
            <FlexCol gap='1.5rem'>
              <TextField
                placeholder='Name of the event'
                className='input-field'
                id='standard-basic'
                variant='standard'
                onChange={(e) => setEventName(e.target.value)}
                value={eventName}
              />
              <Box className='select-input'>
                <FormControl fullWidth>
                  <InputLabel id='activity-type-label'>
                    Activity Type
                  </InputLabel>
                  <Select
                    labelId='activity-type-label'
                    id='activity-type-select'
                    value={activityType}
                    label='Activity Type'
                    style={{ marginRight: '50px' }}
                    onChange={handleActivityTypeChange}
                  >
                    <MenuItem value='High grades in exams'>
                      High grades in exams
                    </MenuItem>
                    <MenuItem value='Research publications'>
                      Research publications
                    </MenuItem>
                    <MenuItem value='Academic competitions'>
                      Academic competitions
                    </MenuItem>
                    <MenuItem value='Projects or thesis accomplishments'>
                      Projects or thesis accomplishments
                    </MenuItem>
                    <MenuItem value='Scholarships and grants'>
                      Scholarships and grants
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField
                placeholder='Title of Achievement (ex, winner, runner-up, participated)'
                className='input-field'
                id='standard-basic'
                variant='standard'
                value={titleOfAchievement}
                onChange={(e) => setTitleOfAchievement(e.target.value)}
              />
              <TextField
                placeholder='Title of Project/ Thesis/ Paper'
                className='input-field'
                id='standard-basic'
                variant='standard'
                value={titleOfProject}
                onChange={(e) => setTitleOfProject(e.target.value)}
              />
              <Typography color={'grey'}>Start date: </Typography>
              <TextField
                className='input-field'
                id='standard-basic'
                variant='standard'
                type='date'
                placeholder='Start Date'
                onChange={(e) => setstartDate(e.target.value)}
                value={startDate}
              />
              <Typography color={'grey'}>End Date: </Typography>
              <TextField
                className='input-field'
                id='standard-basic'
                variant='standard'
                type='date'
                placeholder='End Date'
                onChange={(e) => setendDate(e.target.value)}
                value={endDate}
              />
              <TextField
                className='input-field'
                id='standard-basic'
                variant='standard'
                placeholder='Location'
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
              <TextField
                className='input-field'
                id='standard-basic'
                variant='standard'
                placeholder='Organized By'
                onChange={(e) => setOrganizedBy(e.target.value)}
                value={organizedBy}
              />
              <TextField
                className='input-field'
                id='standard-basic'
                variant='standard'
                placeholder='Short Description'
                onChange={(e) => setShortDescription(e.target.value)}
                value={shortDescription}
              />
            </FlexCol>
          </FlexBetween>
        </FlexCol>
        {isImage && (
          <Box
            alignItems='center'
            justifyContent='center'
            width='50%'
            border={`1px solid ${medium}`}
            borderRadius='5px'
            mt='1rem'
            p='1rem'
            className='image-upload'
          >
            <Dropzone
              acceptedFiles='.jpg,.jpeg,.png'
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p='1rem'
                    width='100%'
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: '15%' }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
        <Divider className='divider' />
        <FlexBetween className='buttons'>
          <FlexBetween onClick={() => setIsImage(!isImage)}>
            <ImageOutlined className='icon' />
            <Typography
              color={mediumMain}
              sx={{ '&:hover': { cursor: 'pointer', color: 'medium' } }}
            >
              Image
            </Typography>
          </FlexBetween>
          {isNonMobileScreens ? (
            <>
              <FlexBetween>
                <GifBoxOutlined className='icon' />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexBetween>
              <FlexBetween>
                <AttachFileOutlined className='icon' />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexBetween>
              {/* <FlexBetween>
                <MicOutlined className='icon' />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween> */}
            </>
          ) : (
            <FlexBetween>
              <MoreHorizOutlined className='icon' />
            </FlexBetween>
          )}
          <Link to='/home'>
            <Button
              disabled={!shortDescription}
              onClick={handlePost}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: '3rem',
              }}
            >
              POST
            </Button>
          </Link>
        </FlexBetween>
      </div>
    </div>
  )
}

export default CurriForm
