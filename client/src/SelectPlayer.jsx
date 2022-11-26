import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem' 
import Typography from '@mui/material/Typography'

const origin = { 
  vertical: 'center', 
  horizontal: 'center' 
}

export default function SelectPlayer({ 
  startingXI,
  players, 
  playerSelected,
  positionName,
  onChange,
  onClose,
  open,
  anchorEl
}) {
  const getNames = (x) => x?.name
  const playerNames = players.map(getNames)
  const startingXINames = startingXI.map(getNames)

  function handlePlayerSelect(playerName) { 
    const playerSelected = players.find(player => player.name === playerName)
    onChange(playerSelected)
  } 

  return (
    <Menu
      id="player-select-menu"
      MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      anchorEl={anchorEl}
      open={Boolean(open)}
      onClose={onClose}
      anchorOrigin={origin}
      transformOrigin={origin}
    >
      <Typography 
        mx={2}
        variant="h6"
        component="li"
      >
        {positionName}
      </Typography>
      {playerNames.map((playerName) => (
        <MenuItem
          key={playerName} 
          onClick={() => handlePlayerSelect(playerName)}
          disabled={open && startingXINames.includes(playerName)}
        >
          {playerName}
        </MenuItem>
      ))}
    </Menu>
  ) 
}
