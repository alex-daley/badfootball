import { createRef, useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { createTheme, ThemeProvider } from '@mui/material/styles' 
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Snackbar from '@mui/material/Snackbar'
import AppDashboard from './AppDashboard'
import AppTopBar from './AppTopBar'
import LoginInfoPopover from './LoginInfoPopover'
import FORMATIONS from './formations'
import getCompetitions from './api/getCompetitions'
import getTeams from './api/getTeams'
import postStartingEleven from './api/postStartingEleven'

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
    logout,
    getAccessTokenSilently
  } = useAuth0()

  const loginButtonRef = createRef()
  const [loginInfoOpen, setLoginInfoOpen] = useState(false)
  const [loginInfoAnchor, setLoginInfoAnchor] = useState()

  const [saveAlert, setSaveAlert] = useState(false)
  const [competitions, setCompetitions] = useState()
  const [competitionSelected, setCompetitionSelected] = useState()
  const [teams, setTeams] = useState()
  const [teamSelected, setTeamSelected] = useState()
  const [loadingTeams, setLoadingTeams] = useState(true)
  const [formationSelected, setFormationSelected] = useState(FORMATIONS[0])
  const [startingXI, setStartingXI] = useState(Array(11).fill())

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
    if (isAuthenticated) {
      logout()
    }
    else {
      setLoginInfoOpen(false)
      loginWithPopup()
    }
  }

  function handleCompetitionClick(competition) {
    setCompetitionSelected(competition)
    getTeams(competition.code).then(teams => {
      setTeams(teams)
      setTeamSelected(teams[0])
      setStartingXI(() => Array(11).fill())
      setLoadingTeams(false)
    })
  }

  function handleTeamClick(teamSelected) {
    setTeamSelected(teamSelected)
  }

  function handleFormationClick(formationSelected) {
    setFormationSelected(formationSelected)
  }

  function handleStartingElevenPlayerClick(playerIndex, player) {
    setStartingXI(players => {
      const slice = players.slice()
      slice[playerIndex] = player
      return slice
    })
  }

  function handleStartingElevenPlayerClear(playerIndex) {
    setStartingXI(players => {
      const slice = players.slice()
      slice[playerIndex] = undefined
      return slice
    })
  }

  async function handleSaveClick() {
    if (!isAuthenticated) {
      setLoginInfoOpen(true)
      setLoginInfoAnchor(loginButtonRef.current)
    } 
    else {
      setSaveAlert(false)

      const token = await getAccessTokenSilently()
      const userId = user.sub 
      const saveData = {
        team: teamSelected.name,
        formation: formationSelected.name,
        players: startingXI.map(player => player?.name ?? 'UNSET')
      }
      
      const { status } = await postStartingEleven(userId, token, saveData)

      if (status === 201) {
        setSaveAlert(true)
      }
    }
  }

  function handleLoadClick() {
    if (!isAuthenticated) {
      setLoginInfoOpen(true)
      setLoginInfoAnchor(loginButtonRef.current)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100%' }}>
        <AppTopBar
          isAuthenticated={isAuthenticated}
          onAccountClick={handleAccountClick}
          user={user}
          ref={loginButtonRef}
        />
        {loginInfoAnchor && (
          <LoginInfoPopover
            open={loginInfoOpen}
            anchorEl={loginInfoAnchor}
            onClose={() => setLoginInfoOpen(false)}
            onClick={handleAccountClick}
          />
        )}
        <Container
          sx={{
            mt: { xs: 2, md: 6 },
            width: '100%'
          }}
        >
          <Snackbar
            open={saveAlert}
            autoHideDuration={3000}
            onClose={() => setSaveAlert(false)}
            message="Starting Eleven Saved!"
          />

          <AppDashboard
            state={{
              competitions,
              competitionSelected,
              loadingTeams,
              teams,
              teamSelected,
              formations: FORMATIONS,
              formationSelected,
              startingXI
            }}
            onCompetitionSelect={handleCompetitionClick}
            onTeamSelect={handleTeamClick}
            onFormationSelect={handleFormationClick}
            onStartingElevenPlayerSelect={handleStartingElevenPlayerClick}
            onStartingElevenPlayerClear={handleStartingElevenPlayerClear}
            onSaveClick={handleSaveClick}
            onLoadClick={handleLoadClick}
          />
        </Container>
      </Box>
    </ThemeProvider>
  )
}
