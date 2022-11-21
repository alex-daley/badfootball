import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppDashboard from './AppDashboard'
import AppTopBar from './AppTopBar'
import FORMATIONS from './formations'
import getCompetitions from './api/getCompetitions'
import getTeams from './api/getTeams'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3700ff'
    }
  }
})

export default function App() {
  const {
    isAuthenticated,
    user,
    loginWithPopup,
    logout
  } = useAuth0()

  const [competitions, setCompetitions] = useState()
  const [competitionSelected, setCompetitionSelected] = useState()
  const [teams, setTeams] = useState()
  const [teamSelected, setTeamSelected] = useState()
  const [loadingTeams, setLoadingTeams] = useState(true)
  const [formationSelected, setFormationSelected] = useState(FORMATIONS[0])

  useEffect(() => {
    getCompetitions().then(competitions => {
      setCompetitions(competitions)
      setCompetitionSelected(competitions[0])
      getTeams(competitions[0].code).then(teams => {
        setTeams(teams)
        setTeamSelected(teams[0])
        setLoadingTeams(false)
      })
    })
  }, []) 

  function handleAccountClick() {
    if (isAuthenticated) logout()
    else loginWithPopup()
  }

  function handleCompetitionClick(competition) {
    setCompetitionSelected(competition)
    getTeams(competition.code).then(teams => {
      setTeams(teams)
      setTeamSelected(teams[0])
      setLoadingTeams(false)
    })
  } 

  function handleTeamClick(teamSelected) {
    setTeamSelected(teamSelected)
  }
  
  function handleFormationClick(formationSelected) {
    setFormationSelected(formationSelected)
  } 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100%' }}>
        <AppTopBar
          isAuthenticated={isAuthenticated}
          onAccountClick={handleAccountClick}
          user={user}
        />
        <Container
          sx={{
            mt: { xs: 2, md: 6 },
            width: '100%'
          }}
        >
          <AppDashboard
            state={{
              competitions,
              competitionSelected,
              loadingTeams,
              teams,
              teamSelected,
              formations: FORMATIONS,
              formationSelected
            }}
            onCompetitionSelect={handleCompetitionClick}
            onTeamSelect={handleTeamClick}
            onFormationSelect={handleFormationClick}
          />
        </Container>
      </Box>
    </ThemeProvider>
  )
}
