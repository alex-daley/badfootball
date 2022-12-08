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
import LoadDialog from './LoadDialog'
import FORMATIONS from './formations'
import ConfirmDialog from './ConfirmDialog'

import readQueryStrings from './readQueryStrings'
import getCompetitions from './api/getCompetitions'
import getTeams from './api/getTeams'
import getStartingElevenById from './api/getStartingElevenById'
import postStartingEleven from './api/postStartingEleven'
import deleteStartingEleven from './api/deleteStartingEleven'
import updateStartingEleven from './api/updateStartingEleven'

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

  const [loadDialogOpen, setLoadDialogOpen] = useState(false)
  const [overwriteDialogOpen, setOverwriteDialogOpen] = useState(false)
  const [nextStateMutation, setNextStateMutation] = useState()

  const [shareAlert, setShareAlert] = useState(false)
  const [saveAlert, setSaveAlert] = useState(false)
  const [competitions, setCompetitions] = useState()
  const [competitionSelected, setCompetitionSelected] = useState()
  const [teams, setTeams] = useState()
  const [teamSelected, setTeamSelected] = useState()
  const [loadingTeams, setLoadingTeams] = useState(true)
  const [formationSelected, setFormationSelected] = useState(FORMATIONS[0])
  const [startingXI, setStartingXI] = useState(Array(11).fill())
  const [saveId, setSaveId] = useState()

  useEffect(() => {
    getCompetitions().then(competitions => {
      setCompetitions(competitions)
      setCompetitionSelected(competitions[0])
      getTeams(competitions[0].code).then(teams => {
        setTeams(teams)
        setTeamSelected(teams[0])
        setLoadingTeams(false)

        // If we have a '?share' query string, attempt to load that saved starting eleven.
        const queryStrings = readQueryStrings()
        if (queryStrings['share']) {
          const lookupId = queryStrings['share']
          window.history.replaceState(null, null, window.location.pathname)
          
          getStartingElevenById(lookupId)
            .then(async(startingEleven) => { 
              const competition = competitions.find(competition => competition.name === startingEleven.competition)
              setCompetitionSelected(competition)

              const teams = await getTeams(competition.code)
              const team = teams.find(team => team.name === startingEleven.team)
              setTeams(teams)
              setTeamSelected(team)

              const formation = FORMATIONS.find(formation => formation.name === startingEleven.formation)
              setFormationSelected(formation)
              setStartingXI(startingEleven.players.map(player => player === 'UNSET' ? undefined : player))
            })
            .catch(() => console.log('Invalid starting eleven'))
        }
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
    if (competition.code === competitionSelected.code) {
      return
    }

    const updateState = () => {
      setCompetitionSelected(competition)
      getTeams(competition.code).then(teams => {
        setTeams(teams)
        setTeamSelected(teams[0])
        setStartingXI(() => Array(11).fill())
        setLoadingTeams(false)
      })
    }

    // If the user has clicked on a new competition and has a non-empty starting eleven grid,
    // render a confirmation dialog before overwriting the starting eleven.
    if (!startingXI.every(x => x === undefined)) {
      setNextStateMutation(() => updateState)
      setOverwriteDialogOpen(true)
    } else { // Otherwise update immediately.
      updateState()
    }
  }

  function handleOverwriteConfirmClick() {
    nextStateMutation()
    handleOverwriteCancelClick()
  }

  function handleOverwriteCancelClick() {
    setNextStateMutation(undefined)
    handleCloseOverwriteDialog()
  }

  function handleCloseOverwriteDialog() {
    setOverwriteDialogOpen(false)
  }

  function handleTeamClick(team) {
    if (team.name === teamSelected.name) {
      return
    }

    const updateState = () => {
      setTeamSelected(team)
      setStartingXI(() => Array(11).fill(undefined))
    }

    // If the user has clicked on a new team and has a non-empty starting eleven grid,
    // render a confirmation dialog before overwriting the starting eleven.
    if (!startingXI.every(x => x === undefined)) {
      setNextStateMutation(() => updateState)
      setOverwriteDialogOpen(true)
    } else { // Otherwise update immediately.
      updateState()
    }
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

  async function handleSaveClick(suppressAlert = false) {
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
        players: startingXI.map(player => player ?? 'UNSET'),
        competition: competitionSelected.name
      }

      let response
      let returnId = saveId

      if (!saveId) {
        response = await postStartingEleven(userId, token, saveData)
        if (response.status === 201) {
          const { insertId } = await response.json()
          returnId = insertId
          setSaveId(insertId)
        }
      }
      else {
        response = await updateStartingEleven(saveId, token, saveData)
      }

      if (response.status === 201 && !suppressAlert) {
        setSaveAlert(true)
      }

      return returnId
    }
  }

  async function handleDelete(startingElevenId) {
    const token = await getAccessTokenSilently()
    deleteStartingEleven(token, startingElevenId)
  }

  function handleLoadClick() {
    if (!isAuthenticated) {
      setLoginInfoOpen(true)
      setLoginInfoAnchor(loginButtonRef.current)
    }
    else {
      setLoadDialogOpen(true)
    }
  }

  async function handleShareClick() {
    const shareId = await handleSaveClick(true)
    window.navigator.clipboard.writeText(`${window.location}?share=${shareId}`)
    setShareAlert(true)
  }

  async function handleLoadSelected(startingEleven) {
    const updateState = async () => {
      const competition = competitions.find(competition => competition.name === startingEleven.competition)
      setCompetitionSelected(competition)

      const teams = await getTeams(competition.code)
      const team = teams.find(team => team.name === startingEleven.team)
      setTeams(teams)
      setTeamSelected(team)

      const formation = FORMATIONS.find(formation => formation.name === startingEleven.formation)
      setFormationSelected(formation)

      setStartingXI(startingEleven.players.map(player => player === 'UNSET' ? undefined : player))
      setSaveId(startingEleven.id)
    }

    // If the user has clicked on a new team and has a non-empty starting eleven grid,
    // render a confirmation dialog before overwriting the starting eleven.
    if (!startingXI.every(x => x === undefined)) {
      setNextStateMutation(() => updateState)
      setOverwriteDialogOpen(true)
    } else { // Otherwise update immediately.
      updateState()
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loadDialogOpen && (
        <LoadDialog
          open={loadDialogOpen}
          onClose={() => setLoadDialogOpen(false)}
          onDelete={handleDelete}
          onLoad={handleLoadSelected}
          userId={user?.sub}
          getAccessTokenSilently={getAccessTokenSilently}
        />
      )}
      <ConfirmDialog
        open={overwriteDialogOpen}
        onClose={handleCloseOverwriteDialog}
        onCancel={handleOverwriteCancelClick}
        onConfirm={handleOverwriteConfirmClick}
        title="Overwrite Changes?"
        content="Clicking confirm will discard any unsaved changes"
      />
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
          <Snackbar
            open={shareAlert}
            autoHideDuration={3000}
            onClose={() => setShareAlert(false)}
            message="Link copied to clickboard!"
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
            onShareClick={handleShareClick}
            saveId={saveId}
          />
        </Container>
      </Box>
    </ThemeProvider>
  )
}
