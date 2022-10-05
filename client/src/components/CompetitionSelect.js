import React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { Link } from 'react-router-dom'

const imageSize = 200

const placeholder = (i = 0) => ({
  emblem: 'https://via.placeholder.com/1?text= ',
  name: 'Coming soon!',
  code: `#${i}`
})

function isPrioritised(competitionCode) {
  return (
    competitionCode === 'WC' || // The World cup
    competitionCode === 'PL' || // The Premier league
    competitionCode === 'ELC'   // The Championship
  )
}

export default function CompetitionSelect({ competitions }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const prioritisedCompetitions = React.useMemo(() => {
    const arr = competitions.reduce((acc, x) => isPrioritised(x.code) ? [x, ...acc] : [...acc, x], [])
    if (!isMobile)
      for (let i = 0; i < 3; i++) arr.push(placeholder(i))
    return arr
  }, [competitions, isMobile])

  return (
    <ImageList rowHeight={imageSize} cols={isMobile ? 2 : 4} >
      {prioritisedCompetitions.map(competition => (
        <Link to={competition.code.startsWith('#') ? '#' : `xi/${competition.code}`} key={competition.code}>
          <ImageListItem>
            <img
              style={{ width: imageSize }}
              src={competition.emblem}
              alt={competition.name}
              loading="lazy"
            />
            <ImageListItemBar subtitle={competition.name} />
          </ImageListItem>

        </Link>
      ))}
    </ImageList>
  )
}
