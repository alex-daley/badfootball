import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import FootballIcon from '@mui/icons-material/SportsSoccer'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CompetitionSelect from './CompetitionSelect'
import TeamBuilder from './TeamBuilder'
import UserProfileDialog from './UserProfileDialog'

const theme = createTheme({
  palette: {
    primary: {
      main: '#09173d'
    }
  }
}) 

export default function App() {
  const [openUserProfile, setOpenUserProfile] = useState(false)
  const [competition, setCompetition] = useState()

  const handleUserProfileClick = () => {
    setOpenUserProfile(open => !open)
  }

  const handleUserProfileClose = () => {
    setOpenUserProfile(false)
  }

  const handleCompetitionSelect = (competition) => {
    setCompetition(competition)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100%' }} >
        <AppBar position="relative" elevation={0}>
          <Toolbar variant="dense">
            <FootballIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
              Badfootball
            </Typography>
            <Tooltip title="Sign in">
              <IconButton onClick={handleUserProfileClick}>
                <Avatar aria-label="Sign in" sx={{ bgcolor: 'grey', color: 'white' }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: { xs: 4, md: 8 }, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper square variant="outlined">
                <CompetitionSelect competition={competition} onClick={handleCompetitionSelect}/>
              </Paper>
            </Grid> 
            <Grid item xs={8}>
              <Paper square variant="outlined" sx={{ height: '100%', p: 2 }}>
                <TeamBuilder competition={competition}/>
              </Paper>
            </Grid> 
          </Grid>

        </Container>
        <UserProfileDialog
          open={openUserProfile}
          onClose={handleUserProfileClose}
        />
      </Box>
    </ThemeProvider>
  )
}
