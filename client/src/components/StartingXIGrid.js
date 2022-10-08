import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import IconAdd from '@mui/icons-material/AddCircle'
import Avatar from '@mui/material/Avatar'

function filterSquad(squad, position) {
  const formatForApiNaming = () => {
    switch (position) {
      case 'forward': return 'Offence'
      case 'defender': return 'Defence'
      case 'midfielder': return 'Midfield'
      case 'goalkeeper': return 'Goalkeeper'
      default: throw Error('Unknown position')
    }
  }
  const apiName = formatForApiNaming()
  return squad.filter(player => player.position === apiName)
}

function flattenFormation(formation) {
  const flatFormation = ['goalkeeper']

  formation.forEach(([role, numPlayers]) => {
    for (let i = 0; i < numPlayers; i++) {
      flatFormation.push(role)
    }
  })

  return flatFormation
}

function calculateWidth(formation, index) {
  let k = 0

  for (const [, numPlayers] of formation) {
    for (let i = 0; i < numPlayers; i++) {
      if (k === index) { 
        return 12 / numPlayers
      }
      k++
    }
  }

  return 1
}

function getInitials(fullName) {
  const names = fullName.split(' ')
  if (names.length === 1) return names[0][0]

  const firstName = names[0]
  const lastName = names[names.length - 1]
  return firstName[0] + lastName[0]
}

function PlayerIcon(props) {
  const { squad, index, player, role, onPlayerChosen } = props

  const squadForRole = filterSquad(squad, role)

  const [anchorEl, setAnchorEl] = React.useState()
  const open = Boolean(anchorEl)
  const label = `Add for player[${index}]`

  const handleClickOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClickClose = () => {
    setAnchorEl(undefined)
  }

  const handlePlayerClick = (player) => {
    onPlayerChosen(index, player)
    handleClickClose()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        border: '1px solid grey'
      }}
    >
      <Tooltip title={label}>
        <IconButton aria-label={label} onClick={handleClickOpen} >
          {player
            ? <Avatar sx={{ width: 50, height: 50 }}>{getInitials(player.name)}</Avatar>
            : <IconAdd sx={{ width: 50, height: 50, fontSize: 60 }} />}
        </IconButton>
      </Tooltip>
      <Menu
        id="team-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClickClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        {squadForRole.map(player => (
          <MenuItem key={player.name} onClick={() => handlePlayerClick(player)}>
            {player.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

function WrappedSelect(props) {
  const { labelId, label, selectId, values, valueIndex, onChange } = props

  const menuItems = !values
    ? <MenuItem value={0}><em></em></MenuItem>
    : values.map((v, i) => <MenuItem key={i} value={i}>{v}</MenuItem>)

  return (
    <FormControl size="small">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select value={valueIndex} labelId={labelId} id={selectId} label={label} onChange={e => onChange(e.target.value)} >
        {menuItems}
      </Select>
    </FormControl>
  )
}

export default function StartingXIGrid(props) {
  const { formations, teams } = props
  const [formationIndex, setFormationIndex] = React.useState(0)
  const [teamIndex, setTeamIndex] = React.useState(0)
  const [startingXI, setStartingXI] = React.useState(Array(11).fill(undefined))

  const teamNames = teams?.map(team => team.name)
  const formation = formations[Object.keys(formations)[formationIndex]]
  const flatFormation = flattenFormation(formation)
  const squad = teams[teamIndex].squad

  const handlePlayerChosen = (index, player) => {
    setStartingXI(players => {
      const updatedPlayers = players.slice()
      updatedPlayers[index] = player
      return updatedPlayers
    })
  }

  return (
    <Stack sx={{ height: '100%' }} spacing={2}>
      <WrappedSelect
        labelId="team-select-label"
        id="team-select"
        label="Team"
        valueIndex={teamIndex}
        values={teamNames}
        onChange={setTeamIndex}
      />
      <WrappedSelect
        labelId="formation-select-label"
        id="formation-select"
        label="Formation"
        valueIndex={formationIndex}
        values={Object.keys(formations)}
        onChange={setFormationIndex}
      />
      <Grid container sx={{ height: '100%' }}>
        {startingXI.map((player, i) => (
          <Grid
            item
            xs={calculateWidth(formation, i)}
            key={i}
          >
            <PlayerIcon
              player={player}
              squad={squad}
              role={flatFormation[i]}
              index={i}
              onPlayerChosen={handlePlayerChosen}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
