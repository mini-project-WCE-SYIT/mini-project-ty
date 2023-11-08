import { Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'
import wce from '../navbar/wce.png'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const AdvertWidget = () => {
  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  return (
    <WidgetWrapper>
      <Typography
        color='primary'
        variant='h2'
        fontWeight='700'
        sx={{ textAlign: 'center', marginTop: '1.5rem' }}
      >
        About WCE and WceAchievo
      </Typography>

      <img
        width='100%'
        height='auto'
        alt='advert'
        src={wce}
        style={{
          borderRadius: '0.75rem',
          margin: '2rem 1.5rem',
          width: '9 0%',
        }}
      />
      <Typography color={main} variant='h6' fontWeight={200}>
        Walchand College of Engineering is situated midway between Sangli and
        Miraj cities at Vishrambag, Sangli. Walchand college of engineering one
        of the top enginnering colleges in Maharashtra providing with UG and PG
        degree programs.
      </Typography>
      <br />
      <Typography color={dark} variant='h6'>
        Vision:
      </Typography>
      <Typography color={main} fontWeight={400}>
        To produce capable graduate engineers with an aptitude for research and
        leadership
      </Typography>
      <br />
      <Typography color={main}>
        During this tenure of Engineering, our students and teachers achieve
        many milestones in various fields.{' '}
        <span style={{ color: dark }}>WceAcievo</span> is a platform to keep a
        record of these achievements.
      </Typography>
      <Button
        component={Link}
        to='/faq'
        variant='contained'
        color='primary'
        style={{ width: '100%', margin: '2rem 0' }}
      >
        Getting started
      </Button>
    </WidgetWrapper>
  )
}

export default AdvertWidget
