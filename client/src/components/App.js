import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box' 
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import FootballIcon from '@mui/icons-material/SportsSoccer'
import { createTheme, ThemeProvider } from '@mui/material/styles' 
import UserProfileDialog from './UserProfileDialog'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1977b5'
    }
  }
})

export default function App() {
  const [openUserProfile, setOpenUserProfile] = useState(false)

  const handleUserProfileClick = () => {
    setOpenUserProfile(open => !open)
  }

  const handleUserProfileClose = () => {
    setOpenUserProfile(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh' }} >
        <AppBar position="relative" elevation={0}>
          <Toolbar>
            <FootballIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
              Badfootball
            </Typography>
            <Tooltip title="Sign in">
              <IconButton onClick={handleUserProfileClick}>
                <Avatar aria-label="Sign in" sx={{ bgcolor: 'grey', color: 'white' }}>
                </Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <UserProfileDialog 
          open={openUserProfile} 
          onClose={handleUserProfileClose} 
        />
      </Box>
    </ThemeProvider>
  )
}
