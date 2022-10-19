import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box' 
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import FootballIcon from '@mui/icons-material/SportsSoccer'
import { createTheme, ThemeProvider } from '@mui/material/styles' 
import CompetitionSelect from './CompetitionSelect'
import UserProfileDialog from './UserProfileDialog'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5a005a'
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
      <Box sx={{ height: '100%' }} >
        <AppBar position="relative">
          <Toolbar variant="dense">
            <FootballIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
              Badfootball
            </Typography>
            <Tooltip title="Sign in">
              <IconButton onClick={handleUserProfileClick}>
                <Avatar aria-label="Sign in" sx={{ bgcolor: 'grey', color: 'white' }}/>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ mt: { xs: 4, md: 8 }, width: '100%' }}>
          <Router>
            <Routes>
              <Route path="/" element={<CompetitionSelect/>} />
            </Routes>
          </Router>
        </Container>
        <UserProfileDialog 
          open={openUserProfile} 
          onClose={handleUserProfileClose} 
        />
      </Box>
    </ThemeProvider>
  )
}
