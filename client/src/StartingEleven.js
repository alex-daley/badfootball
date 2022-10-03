import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import IconAdd from '@mui/icons-material/AddCircle'

const GLK = 'goalkeeper'
const DEF = 'defender'
const MID = 'midfielder'
const FWD = 'forward'

const FORMATIONS = {
  '4-4-3'    : [[DEF, 4], [MID, 3], [FWD, 3]],
  '4-2-3-1'  : [[DEF, 4], [MID, 2], [MID, 3], [FWD, 1]],
  '5-3-2'    : [[DEF, 5], [MID, 3], [FWD, 2]],
  '4-5-1'    : [[DEF, 4], [MID, 5], [FWD, 1]],
  '4-4-2'    : [[DEF, 4], [MID, 4], [FWD, 2]],
  '3-4-3'    : [[DEF, 3], [MID, 4], [FWD, 3]],
  '5-4-1'    : [[DEF, 5], [MID, 4], [FWD, 1]],
  '3-5-2'    : [[DEF, 3], [MID, 5], [FWD, 2]],
  '4-3-2-1'  : [[DEF, 4], [MID, 3], [MID, 2], [FWD, 1]],
  '4-1-2-1-2': [[DEF, 4], [MID, 1], [MID, 2], [MID, 1], [FWD, 2]],
  '3-3-3-1'  : [[DEF, 3], [MID, 3], [MID, 3], [FWD, 1]],
  '3-4-1-2'  : [[DEF, 3], [MID, 4], [MID, 1], [FWD, 2]]
}

function PlayerIcon(props) {
  const { position } = props
  const label = `Add a ${position}`

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
        <IconButton aria-label={label}  >
          <IconAdd sx={{ fontSize: 60 }} />
        </IconButton>
      </Tooltip>
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
      <Grid item key={position+numPlayers+i} xs={widthPerItem}>
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
      <PlayerRow position={GLK} numPlayers={1} />
      {formation.map(([position, numPlayers], i) => (
        <PlayerRow key={position + numPlayers + i} position={position} numPlayers={numPlayers} />
      ))}
    </Grid>
  )
}

export default function StartingEleven() {
  const [formationName, setFormationName] = React.useState('4-4-3')

  const handleFormationChange = (event) => {
    setFormationName( event.target.value)
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <FormControl>
        <InputLabel id="formation-select-helper-label">Formation</InputLabel>
        <Select
          value={formationName}
          labelId="formation-select-helper-label"
          id="formation-select-helper" 
          label="Formation"
          onChange={handleFormationChange}
        >
          {Object.keys(FORMATIONS).map(formation => (
            <MenuItem key={formation} value={formation}>{formation}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Select formation</FormHelperText>
      </FormControl>
      <StartingElevenGrid formation={FORMATIONS[formationName]}/>
    </Stack>
  )
}
