import { useState, createRef } from 'react'
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
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import FootballIcon from '@mui/icons-material/SportsSoccer'
import AccountIcon from '@mui/icons-material/AccountCircle'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CompetitionSelect from './CompetitionSelect'
import TeamBuilder from './TeamBuilder'
import WrappedAlert from './WrappedAlert'
import ProfilePopover from './ProfilePopover'
import SaveDialog from './SaveDialog'
import useCompetitions from '../api/useCompetitions'
import useTeamData from '../api/useTeamData'
import useFormations from '../api/useFormations'
import saveStartingEleven from '../api/saveStartingEleven'
import LoadDialog from './LoadDialog'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3700ff'
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
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0()
  const loginButtonRef = createRef()

  const [competition, setCompetition] = useState()
  const [profileAnchorEl, setProfileAnchorEl] = useState()
  const [saveAlert, setSaveAlert] = useState(false)
  const [saveDialog, setSaveDialog] = useState(false)
  const [saveContext, setSaveContext] = useState({ team: undefined, formation: undefined, startingEleven: [] })
  const [loadDialog, setLoadDialog] = useState(false)

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
    setProfileAnchorEl(currentAnchorEl => currentAnchorEl ? null : loginButtonRef.current)
  }

  const handleUserProfileClose = () => {
    setProfileAnchorEl(null)
  }

  const handleCompetitionSelect = (competition) => {
    setCompetition(competition)
  }

  const handleSaveDialogClose = () => {
    setSaveDialog(false)
  }

  const handleLoadDialogClose = () => {
    setLoadDialog(false)
  }

  const handleSaveDialogSave = async (saveName) => {
    const token = await getAccessTokenSilently()
    const userId = user.sub
    const saveData = {
      saveName,
      team: saveContext.team.name,
      formation: saveContext.formation.name,
      players: saveContext.startingEleven.map(player => player.name ?? 'UNSET')
    }

    const { status } = await saveStartingEleven(token, userId, saveData)
    
    if (status === 201) {
      setSaveAlert(true)
    }
    handleSaveDialogClose()
  }

  const handleSave = async (_, { team, formation, startingEleven }) => {
    if (!isAuthenticated) {
      handleUserProfileClick()
      return
    }

    setSaveContext({ team, formation, startingEleven })
    setSaveDialog(true)
  }

  const handleLoad = () => {
    if (!isAuthenticated) {
      handleUserProfileClick()
      return
    }

    setLoadDialog(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {saveDialog && (
        <SaveDialog
          open={saveDialog}
          onClose={handleSaveDialogClose}
          saveContext={saveContext}
          onSave={handleSaveDialogSave}
          onCancel={handleSaveDialogClose}
        />
      )}
      {loadDialog && (
        <LoadDialog
          open={loadDialog}
          onClose={handleLoadDialogClose}
        />
      )}
      <Box sx={{ height: '100%' }} >
        <AppBar position="relative" elevation={0}>
          <Toolbar variant="dense" sx={{ width: '100%', maxWidth: 'lg', mx: 'auto' }}>
            <FootballIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
              Badfootball
            </Typography>
            <Tooltip title="Your profile">
              <Button ref={loginButtonRef} size="large" edge="start" color="inherit" onClick={handleUserProfileClick} endIcon={<AccountIcon />}>
                {!isLoading && (isAuthenticated ? user.name : 'Login')}
              </Button>
            </Tooltip>
            <ProfilePopover open={Boolean(profileAnchorEl)} anchorEl={profileAnchorEl} onClose={handleUserProfileClose} />
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: { xs: 4, md: 8 }, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper variant="outlined">
                {!isLoadingCompetitions &&
                  <CompetitionSelect competitions={competitions} competition={competition} onClick={handleCompetitionSelect} />}
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper variant="outlined" sx={{ height: '100%', p: 2 }}>
                {!competition
                  ? <PlaceholderText content="Please select a competition." />
                  : !isLoadingTeamData && <TeamBuilder competitionName={competition.name} teams={teams} formations={formations} onSaveClick={handleSave} onLoadClick={handleLoad} />}
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="caption" sx={{ mt: 2 }}>
              Football data provided by the <Link variant="caption" href="https://www.football-data.org/">Football-Data.org API</Link>
            </Typography>
          </Box>
          <WrappedAlert open={saveAlert} message="Starting Eleven Saved!" onClose={() => setSaveAlert(false)} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}
