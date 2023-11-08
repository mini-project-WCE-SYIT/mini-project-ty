import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Friend from 'components/Friend'
import WidgetWrapper from 'components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from 'state'

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  branch,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
}) => {
  const calculateTimeAgo = (createdAt) => {
    const createdAtDate = new Date(createdAt)
    const currentDate = new Date()
    const timeDifference = currentDate - createdAtDate
    const millisecondsInMonth = 30.44 * 24 * 60 * 60 * 1000
    const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000

    const monthsAgo = Math.floor(timeDifference / millisecondsInMonth)
    const yearsAgo = Math.floor(timeDifference / millisecondsInYear)

    if (yearsAgo >= 1) {
      if (monthsAgo > 0) {
        return `${yearsAgo} year${
          yearsAgo > 1 ? 's' : ''
        } and ${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`
      } else {
        return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`
      }
    } else if (monthsAgo >= 1) {
      return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`
    } else {
      const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000))
      if (daysAgo === 0) {
        return 'today'
      } else {
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
      }
    }
  }
  const [isComments, setIsComments] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)
  const isLiked = Boolean(likes[loggedInUserId])
  const likeCount = Object.keys(likes).length

  const { palette } = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main
  const medium = palette.neutral.medium

  const patchLike = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/posts/${postId}/like`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    )
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={branch}
        userPicturePath={userPicturePath}
      />

      <Typography color={medium}>
        Posted {calculateTimeAgo(createdAt)}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`${process.env.REACT_APP_URL}/assets/${picturePath}`}
        />
      )}
      <Typography color={main} sx={{ mt: '1rem' }} variant='h6'>
        {description}
      </Typography>
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget
