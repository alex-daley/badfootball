import Box from '@mui/material/Box'
//import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'

export default function FootbalPlayerAvatar({ position }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: 50
      }}
    >
      <Tooltip title={`Add a ${position}`}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <IconButton>
            <Avatar>
              <AddIcon />
            </Avatar>
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  )
}
