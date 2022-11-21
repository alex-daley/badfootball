import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

function filterCompetitions(competitions, codes) {
  return competitions.filter(competition => !codes.includes(competition.code))
}

export default function SelectCompetition({ competitionSelected, competitions, onClick }) {
  return (
    <List
      dense
      sx={{
        height: {
          xs: 250,
          md: 'unset'
        },
        overflow: 'auto'
      }}
    >
      {filterCompetitions(competitions, ['EC']).map(competition => (
        <ListItem 
          key={competition.code}
          sx={{ p: 0 }}
        >
          <ListItemButton
            onClick={() => onClick(competition)}
            selected={competition.code === competitionSelected?.code}
          >
            <ListItemAvatar>
              <Avatar
                src={competition.emblem}
                alt={competition.name}
              />
            </ListItemAvatar>
            <ListItemText
              primary={competition.name}
              secondary={competition.country}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
