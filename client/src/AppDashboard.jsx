import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'
import DownloadIcon from '@mui/icons-material/Download'
import ShareIcon from '@mui/icons-material/Share'
import Attribution from './Attribution'
import FormationGrid from './FormationGrid'
import SelectCompetition from './SelectCompetition'
import SelectTeam from './SelectTeam'
import SelectFormation from './SelectFormation'
import SelectPlayer from './SelectPlayer'
import normalisePositionNaming from './api/normaliseNaming'

function GridPaper({ xs, md, children }) {
  return (
    <Grid item xs={xs} md={md}>
      <Paper
        elevation={6}
        sx={{
          height: '100%',
          p: 2
        }}
      >
        {children}
      </Paper>
    </Grid>
  )
}

function Section({ title, children }) {
  return (
    <Stack
      sx={{
        height: '100%'
      }}
    >
      <Typography
        compoentn="div"
        variant="caption"
      >
        {title}
      </Typography>
      {children}
    </Stack>
  )
}

function SaveButton({ onClick }) {
  return (
    <Button
      startIcon={<SaveIcon />}
      onClick={onClick}
      color="secondary"
    >
      Save
    </Button>
  )
}

function LoadButton({ onClick }) {
  return (
    <Button
      startIcon={<DownloadIcon />}
      onClick={onClick}
      color="secondary"
    >
      Load
    </Button>
  )
}

function ShareButton({ onClick }) {
  return (
    <Button
      startIcon={<ShareIcon />}
      onClick={onClick}
      color="secondary"
    >
      Share 
    </Button>
  )
}

function filterSelectablePlayers(teamSelected, positionName) {
  if (!teamSelected || !teamSelected.squad || !positionName) return []
  return teamSelected.squad.filter(player => player.position === positionName)
}

function determinePositionName(formation, playerIndex) {
  let i = 0
  for (const [position, count] of formation.layout) {
    for (let k = 0; k < count; k++) {
      if (++i === playerIndex) return normalisePositionNaming(position)
    }
  }
}

function tryGetPlayerAtIndex(startingXI, playerIndex) {
  if (!playerIndex) return undefined
  return startingXI[playerIndex]
}

export default function AppDashboard({
  state,
  onCompetitionSelect,
  onTeamSelect,
  onFormationSelect,
  onStartingElevenPlayerSelect,
  onStartingElevenPlayerClear,
  onSaveClick,
  onLoadClick,
  onShareClick,
  saveId
}) {
  const [updateData, setUpdateData] = useState(null)

  function closePlayerSelect() {
    setUpdateData(data => ({ ...data, open: false }))
  }

  function handleUpdateInit(event, playerIndex) {
    setUpdateData({
      anchorEl: event.currentTarget,
      open: true,
      position: determinePositionName(state.formationSelected, playerIndex),
      playerIndex
    })
  }

  function handleUpdateCommit(player) {
    const index = updateData.playerIndex
    onStartingElevenPlayerSelect(index, player)
    if (index) {
      closePlayerSelect()
    }
  }

  function handleSaveClick() {
    onSaveClick()
  }

  function handleLoadClick() {
    onLoadClick()
  }

  function handleShareClick() {
    onShareClick()
  }

  return (
    <>
      <SelectPlayer
        startingXI={state.startingXI}
        players={filterSelectablePlayers(state.teamSelected, updateData?.position)}
        anchorEl={updateData?.anchorEl}
        open={updateData?.open}
        positionName={updateData?.position}
        playerSelected={tryGetPlayerAtIndex(state.startingXI, updateData?.playerIndex)}
        onChange={handleUpdateCommit}
        onClose={closePlayerSelect}
      />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Attribution />
        </Grid>
        {state.competitions && state.competitionSelected && (
          <GridPaper xs={12} md={4}>
            <Section title="Please choose a competition">
              <SelectCompetition
                competitions={state.competitions}
                competitionSelected={state.competitionSelected}
                onClick={onCompetitionSelect}
              />
            </Section>
          </GridPaper>)}
        {!state.loadingTeams && (
          <GridPaper xs={12} md={8}>
            <Section title="Build your starting eleven!">
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  display: 'flex',
                  mt: 1
                }}
              >
                <Box sx={{ flex: 3 }}>
                  <SelectTeam
                    teams={state.teams}
                    teamSelected={state.teamSelected}
                    onChange={onTeamSelect}
                  />
                </Box>
                <Box sx={{ flex: 2 }}>
                  <SelectFormation
                    formations={state.formations}
                    formationSelected={state.formationSelected}
                    onChange={onFormationSelect}
                  />
                </Box>
              </Stack>
              <FormationGrid
                formation={state.formationSelected}
                startingXI={state.startingXI}
                teamEmblem={state.teamSelected?.crest}
                onClick={handleUpdateInit}
                onClear={onStartingElevenPlayerClear}
              />
              <Stack
                direction="row"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <LoadButton onClick={handleLoadClick} />
                  {saveId && (
                    <Typography variant="caption">{`Current save id: ${saveId}`}</Typography>
                  )}
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                >
                  <ShareButton onClick={handleShareClick} />
                  <SaveButton onClick={handleSaveClick} />
                </Stack>
              </Stack>
            </Section>
          </GridPaper>)}
      </Grid>
    </>
  )
}
