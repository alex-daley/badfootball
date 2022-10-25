import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import AddIcon from '@mui/icons-material/AddCircleOutline'
import WrappedSelect from './WrappedSelect'
import WrappedSpan from './WrappedSpan' 

function initStartingEleven(formation) {
  const rows = []

  for (let i = 0; i < formation.layout.length; i++) {
    const [position, numPlayers] = formation.layout[i]
    const players = []
    for (let k = 0; k < numPlayers; k++) {
      players.push({  
        key: `${position}-${k + 1}`,
        position,
        player: null
      })
    } 

    rows.push({
      key: `row-${i + 1}`,
      players
    })
  }

  return rows
}

// Convert how we describe football positions to how the football-data.org API does so.
function footballDataOrgNameToOurName(position) {
  switch (position) {
    case 'forward': return 'Offence'
    case 'defender': return 'Defence'
    case 'midfielder': return 'Midfield'
    case 'goalkeeper': return 'Goalkeeper'
    default: throw Error('Unknown position')
  }
}

function PlayerIcon({ player, onClick }) {
  const handleClick = event => onClick?.(event, player)

  return (
    <Tooltip title={`Add a ${player.position}`}>
      <IconButton onClick={handleClick}>
        <Avatar> 
          <AddIcon/>
        </Avatar>
      </IconButton>
    </Tooltip>
  )
}

function PlayerSelectMenu({ anchorEl, onClose, players }) {
  const origin = { vertical: 'center', horizontal: 'center' }
  const open = Boolean(anchorEl) && Boolean(players)
  return (
    <Menu
      id="player-select-menu"
      MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={origin}
      transformOrigin={origin} 
    > 
      {players?.map(player => (
        <MenuItem key={player.name}>
          {player.name}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default function TeamBuilder({ competitionName, teams, formations }) {
  const [team, setTeam] = useState(() => teams[0])
  const [formation, setFormation] = useState(() => formations[0])
  const [startingEleven, setStartingEleven] = useState(() => initStartingEleven(formation))
  const [menuAnchor, setMenuAnchor] = useState()
  const [selectedPosition, setSelectedPosition] = useState()

  const playersForPosition = team.squad.filter(player => player.position === selectedPosition)

  useEffect(() => {
    setStartingEleven(initStartingEleven(formation))
  }, [formation])

  const teamNames = teams.map(team => team.name)
  const formationNames = formations.map(formation => formation.name)
  
  const handleTeamSelect = teamName => {
    setTeam(teams.find(team => team.name === teamName))
  }

  const handleFormationSelect = formationName => {
    setFormation(formations.find(formation => formation.name === formationName))
  }

  const handleFormationPlaceClick = (event, player) => {
    setMenuAnchor(event.currentTarget)
    setSelectedPosition(footballDataOrgNameToOurName(player.position))
  }

  const handleClosePlayerMenu = () => {
    setMenuAnchor(undefined)
  }

  return (
    <Stack sx={{ height: '100%' }} spacing={2}>
      <Typography variant="h5" component="p">
        {competitionName}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ display: 'flex' }}>
        <Box sx={{ flex: 3 }}>
          <WrappedSelect label="team" value={team.name} values={teamNames} onChange={handleTeamSelect} />
        </Box>
        <Box sx={{ flex: 2 }}>
          <WrappedSelect label="formation" value={formation.name} values={formationNames} onChange={handleFormationSelect}/>
        </Box>
      </Stack>
      <Divider/>
      <Typography variant="body2">
        Build your <WrappedSpan text={team.name}/> <WrappedSpan text={formation.name} secondary/> dream team!
      </Typography>
      <Grid container sx={{ height: '100%' }}>
        <PlayerSelectMenu 
          anchorEl={menuAnchor} 
          onClose={handleClosePlayerMenu} 
          players={playersForPosition}
        />
        {startingEleven.map(row => {
          const numPlayers = row.players.length
          const width = 12 / numPlayers

          return row.players.map(player => (
            <Grid item key={player.key + player.name} xs={width} >
              <Box sx={{ pt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PlayerIcon player={player} onClick={handleFormationPlaceClick}/>
              </Box>
            </Grid>
          ))
        })}
      </Grid>
    </Stack>
  )
}
