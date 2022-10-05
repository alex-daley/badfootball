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

const SquadContext = React.createContext(null)

function filterSquad(squad, position) {
  const formatForApiNaming = () => {
    switch (position) {
      case 'forward': return 'Offence'
      case 'defender': return 'Defence'
      case 'midfielder' : return 'Midfield'
      case 'goalkeeper': return 'Goalkeeper'
      default: throw Error('Unknown position')
    }
  }
  const apiName = formatForApiNaming()
  return squad.filter(player => player.position === apiName)
}

function PlayerIcon(props) {
  const { position } = props
  const squad = React.useContext(SquadContext) 
  const squadForPosition = filterSquad(squad(), position)

  const [anchorEl, setAnchorEl] = React.useState()
  const open = Boolean(anchorEl)
  const label = `Add a ${position}` 

  const handleClickOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClickClose = () => {
    setAnchorEl(undefined)
  }

  const handlePlayerClick = (player) => {
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
        <IconButton aria-label={label} onClick={ handleClickOpen} >
          <IconAdd sx={{ fontSize: 60 }} />
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
        {squadForPosition.map(player => (
          <MenuItem key={player.name} onClick={handlePlayerClick}>
            {player.name}
          </MenuItem>  
        ))}
      </Menu>
    </Box>
  )
}

function PlayerRow(props) {
  const MAX_BREAKPOINT = 12
  const { position, numPlayers } = props

  const widthPerItem = MAX_BREAKPOINT / numPlayers
  const nodes = new Array(numPlayers)

  for (let i = 0; i < numPlayers; i++) {
    nodes[i] = (
      <Grid item key={position + numPlayers + i} xs={widthPerItem}>
        <PlayerIcon position={position} />
      </Grid>
    )
  }

  return (
    <React.Fragment>
      {nodes}
    </React.Fragment>
  )
}

function StartingElevenGrid(props) {
  const { formation } = props

  return (
    <Grid container sx={{ height: '100%' }}>
      <PlayerRow position={'goalkeeper'} numPlayers={1} />
      {formation.map(([position, numPlayers], i) => (
        <PlayerRow key={position + numPlayers + i} position={position} numPlayers={numPlayers} />
      ))}
    </Grid>
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

  const teamNames = teams?.map(team => team.name)
  const formation = formations[Object.keys(formations)[formationIndex]]
  const squad = teams[teamIndex].squad 

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
      <SquadContext.Provider value={() => squad}>
        <StartingElevenGrid formation={formation} />
      </SquadContext.Provider>
    </Stack>
  )
}
