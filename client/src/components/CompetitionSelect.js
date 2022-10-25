import { useMemo } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar' 
import Avatar from '@mui/material/Avatar'

function isPrioritised(competitionCode) {
  return (
    competitionCode === 'PL'  || // The Premier league
    competitionCode === 'ELC' || // The Championship
    competitionCode === 'CL'  || // Champions league
    competitionCode === 'EC'     // European Championship
  )
}

export default function CompetitionSelect({ competition, competitions, onClick }) {
  const prioritisedCompetitions = useMemo(() => {
    return competitions
      .reduce((acc, x) => isPrioritised(x.code) ? [x, ...acc] : [...acc, x], [])
      .slice(0, 12)
  }, [competitions]) 

  return (
    <List dense>
      {prioritisedCompetitions.map(c => (
        <ListItem key={c.code}>
          <ListItemButton onClick={() => onClick(c)} selected={c.code === competition?.code}>
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
