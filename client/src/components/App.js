import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog' 
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import FootballIcon from '@mui/icons-material/SportsSoccer'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SignIn from './SignIn'
import SignUp from './SignUp'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1977b5'
    }
  }
})

export default function App() {
  const [userContext, setUserContext] = useState({ state: undefined })

  function handleUserProfileClick() {
    setUserContext(ctx => ({ ...ctx, state: 'signin' }))
  }

  function handleCloseUserProfile() {
    setUserContext(ctx => ({ ...ctx, state: undefined }))
  }

  function handleSignUpClick() {
    setUserContext(ctx => ({ ...ctx, state: undefined }))
    setTimeout(() => {
      setUserContext(ctx => ({ ...ctx, state: 'signup' }))
    }, 300)
    
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
        <Dialog 
          open={userContext.state === 'signin'} 
          onClose={handleCloseUserProfile}
          maxWidth="xs"
          fullWidth
        > 
          <SignIn 
            onSignUpRequest={handleSignUpClick}
          />
        </Dialog>
        <Dialog 
          open={userContext.state === 'signup'} 
          onClose={handleCloseUserProfile}
          maxWidth="xs"
          fullWidth
        > 
          <SignUp/>
        </Dialog>
      </Box>
    </ThemeProvider>
  )
}
