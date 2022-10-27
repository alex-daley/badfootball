import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
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
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import FootballIcon from '@mui/icons-material/SportsSoccer'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CompetitionSelect from './CompetitionSelect'
import TeamBuilder from './TeamBuilder'
import useCompetitions from '../api/useCompetitions'
import useTeamData from '../api/useTeamData'
import useFormations from '../api/useFormations'

const theme = createTheme({
  palette: {
    primary: {
      main: '#09173d'
    }
  }
})

function PlaceholderText({ content }) {
  return (
    <Typography variant="h5" component="p">
      {content}
    </Typography>
  )
}

export default function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  const [competition, setCompetition] = useState()

  const {
    isLoading: isLoadingCompetitions,
    competitions
  } = useCompetitions()

  const {
    isLoading: isLoadingTeamData,
    teams
  } = useTeamData(competition?.code)

  const { formations } = useFormations()

  const handleUserProfileClick = () => {
    if (isAuthenticated)  {
      logout({ returnTo: window.location.origin })
    }
    else {
      loginWithRedirect()
    }
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
                {!isLoadingCompetitions &&
                  <CompetitionSelect competitions={competitions} competition={competition} onClick={handleCompetitionSelect} />}
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper square variant="outlined" sx={{ height: '100%', p: 2 }}>
                {!competition
                  ? <PlaceholderText content="Please select a competition." />
                  : !isLoadingTeamData && <TeamBuilder competitionName={competition.name} teams={teams} formations={formations} />}
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="caption" sx={{ mt: 2 }}>
              Football data provided by the <Link variant="caption" href="https://www.football-data.org/">Football-Data.org API</Link>
            </Typography>

          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
