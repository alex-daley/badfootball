import { useAuth0 } from '@auth0/auth0-react'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

function Login() { 
  const { loginWithRedirect } = useAuth0()

  const handleClick = () => {
    loginWithRedirect()
  }

  return (
    <Stack spacing={2}> 
      <Button startIcon={<AccountCircleIcon/>} variant="outlined" onClick={handleClick}>
        Login or Sign-up
      </Button>
      <Typography component="div" variant="caption">
        Authentication powered by <Link href="https://auth0.com/" rel="noopener noreferrer" target="_blank">Auth0</Link>.
      </Typography>
      <Divider/>
      <Typography component="div">
        An optional free badfootball account allows you to save and load team formations from the cloud.
      </Typography>
    </Stack>

  )
}

export default function ProfilePopover({ open, anchorEl, onClose }) {
  const handleClose = () => {
    onClose?.()
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }} 
      sx={{ m: 2 }}
    >
      <Box sx={{ minHeight: 200, maxWidth: 400 }}>
        <AppBar position="static"  elevation={0}>
          <Toolbar variant="dense" >
            <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
              Profile
            </Typography>
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box p={2}>
          <Login />
        </Box>
      </Box>
    </Popover>
  )
} 
