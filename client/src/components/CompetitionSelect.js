import { useMemo } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import useCompetitions from '../api/useCompetitions'
import Routes from '../routes'

function isPrioritised(competitionCode) {
  return (
    competitionCode === 'PL' || // The Premier league
    competitionCode === 'ELC' || // The Championship
    competitionCode === 'CL' || // Champions league
    competitionCode === 'EC'    // European Championship
  )
}

function CompetitionList({ competitions }) {
  const prioritisedCompetitions = useMemo(() => {
    return competitions
      .reduce((acc, x) => isPrioritised(x.code) ? [x, ...acc] : [...acc, x], [])
      .slice(0, 12)
  }, [competitions])

  const handleClick = (competitionCode) => {
    const route = Routes.starting11(competitionCode)
    Routes.redirectTo(route)
  }

  return (
    <List dense>
      {prioritisedCompetitions.map(c => (
        <ListItem>
          <ListItemButton onClick={() => handleClick(c.code)}>
            <ListItemAvatar>
              <Avatar src={c.emblem} alt={c.name} />
            </ListItemAvatar>
            <ListItemText primary={c.name} secondary={c.country} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default function CompetitionSelect() {
  const { competitions, isLoading } = useCompetitions()
  if (isLoading) return <></>

  return (
    <Paper square elevation={2}>
      <CompetitionList competitions={competitions} />
    </Paper>
  )
}
