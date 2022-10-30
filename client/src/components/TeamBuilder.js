import { useState, useMemo } from 'react'
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
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ShareIcon from '@mui/icons-material/Share'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import RemoveIcon from '@mui/icons-material/HighlightOff'
import WrappedSelect from './WrappedSelect'
import WrappedSpan from './WrappedSpan'
import FootballPitch from './footballpitch.png'

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

function getInitials(fullName) {
  const names = fullName.split(' ')
  if (names.length === 1) return names[0][0]
  const firstName = names[0]
  const lastName = names[names.length - 1]
  return firstName[0] + lastName[0]
}

function StartingElevenPlace({ index, currentPlayer, position, onClick, onRemove }) {
  const handleClick = (event) => {
    onClick?.(event, index)
  }

  const handleRemove = () => {
    onRemove?.(index)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: 50 }}> 
      <Box sx={{ visibility: !currentPlayer?.name || currentPlayer.position === footballDataOrgNameToOurName(position) ? 'hidden' : 'visible' }}>
        <Typography sx={{ color: '#e30e1f', fontWeight: 'bolder' }} variant="caption">
          Invalid position
        </Typography>
        <IconButton sx={{ color: '#e30e1f', padding: 0, ml: .5 }} onClick={handleRemove}>
          <RemoveIcon/>
        </IconButton> 
        </Box>
      <Tooltip title={`Add a ${position}`}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton onClick={handleClick}>
            <Avatar>
              {!currentPlayer?.name ? <AddIcon/> : getInitials(currentPlayer.name)}
            </Avatar>
          </IconButton>
        </Box>
      </Tooltip> 
      <Typography variant="body2" sx={{ minHeight: 30, textAlign: 'center' }}>
        {currentPlayer?.name}
      </Typography> 
    </Box>
  )
}

function PlayerSelectMenu({ anchorEl, startingEleven, players, onClick, onClose }) {
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
        <MenuItem
          key={player.name}
          disabled={startingEleven.map(player => player.name).includes(player.name)}
          onClick={() => onClick?.(player)}
        >
          {player.name}
        </MenuItem>
      ))}
    </Menu>
  )
}

function FormationGrid({ formation, startingEleven, onClick, onRemove }) {
  const gridItems = []
  let index = 0
  for (const [position, numPlayers] of formation.layout) {

    for (let i = 0; i < numPlayers; i++) {
      index++
      const currentPlayer = startingEleven[index]
      
      const width = 12 / numPlayers
      gridItems.push(
        <Grid item xs={width} key={`row-${index}`}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <StartingElevenPlace
              index={index}
              currentPlayer={currentPlayer}
              position={position}
              onClick={(event, index) => onClick(event, index, footballDataOrgNameToOurName(position))}
              onRemove={onRemove}
            />
          </Box>
        </Grid>
      )

    }
  }

  return <>{gridItems}</>
}

export default function TeamBuilder({ competitionName, teams, formations, onSaveClick, onLoadClick }) {
  const [team, setTeam] = useState(() => teams[0])
  const [formation, setFormation] = useState(() => formations[0])
  const [startingEleven, setStartingEleven] = useState(() => Array(11).fill({}))
  const [startingElevenUpdateIndex, setStartingElevenUpdateIndex] = useState()
  const [startingElevenMenuFilter, setStartingElevenMenuFilter] = useState()
  const [menuAnchor, setMenuAnchor] = useState()

  const teamNames = teams.map(team => team.name)
  const formationNames = formations.map(formation => formation.name)

  const players = useMemo(() => team.squad.filter(player => player.position === startingElevenMenuFilter),
    [team, startingElevenMenuFilter])

  const handleTeamSelect = teamName => {
    setTeam(teams.find(team => team.name === teamName))
  }

  const handleFormationSelect = formationName => {
    setFormation(formations.find(formation => formation.name === formationName))
  }

  const handleStartingElevenPlaceClick = (event, index, filter) => {
    setMenuAnchor(event.currentTarget)
    setStartingElevenUpdateIndex(index)
    setStartingElevenMenuFilter(filter)
  }

  const handleStartingElevenPlaceRemoveClick = (index) => { 
    setStartingEleven(startingEleven => {
      const startingEleven_ = startingEleven.slice()
      startingEleven_[index] = {} 
      return startingEleven_
    })
  }

  const handlePlayerSelectMenuClick = (player) => {
    setStartingEleven(startingEleven => {
      const startingEleven_ = startingEleven.slice()
      startingEleven_[startingElevenUpdateIndex] = player
      return startingEleven_
    })

    handlePlayerSelectMenuClose()
  }

  const handlePlayerSelectMenuClose = () => {
    setMenuAnchor()
    setStartingElevenUpdateIndex()
  } 

  const handleSaveClick = (event) => {
    onSaveClick?.(event, { team, formation, startingEleven })
  }

  const handleLoadClick = (event) => {
    onLoadClick?.(event)
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
          <WrappedSelect label="formation" value={formation.name} values={formationNames} onChange={handleFormationSelect} />
        </Box>
      </Stack>
      <Divider />
      <Typography variant="body2">
        Build your <WrappedSpan text={team.name} /> <WrappedSpan text={formation.name} secondary /> dream team!
      </Typography>
      <Grid 
        container 
        sx={{ 
          p: 2, 
          height: '100%', 
          backgroundImage: `url(${FootballPitch})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center'
         }}
      >
        <PlayerSelectMenu
          anchorEl={menuAnchor}
          players={players}
          startingEleven={startingEleven}
          onClick={handlePlayerSelectMenuClick}
          onClose={handlePlayerSelectMenuClose}
        />
        <FormationGrid
          formation={formation}
          startingEleven={startingEleven}
          onClick={handleStartingElevenPlaceClick}
          onRemove={handleStartingElevenPlaceRemoveClick}
        />
      </Grid>
      <Divider/>
      <Stack direction="row" spacing={1}  >
        <Button color="secondary" disableElevation onClick={handleLoadClick} startIcon={<CloudDownloadIcon/>}>
          Load 
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="secondary" disableElevation onClick={handleSaveClick} startIcon={<CloudUploadIcon/>}>
          Save & Upload
        </Button>
        <Button color="secondary" disableElevation startIcon={<ShareIcon/>}>
          Share
        </Button>
      </Stack>
    </Stack>
  )
}
