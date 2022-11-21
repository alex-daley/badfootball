import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import SelectCompetition from './SelectCompetition'
import SelectTeam from './SelectTeam'
import SelectFormation from './SelectFormation'

function GridPaper({ xs, md, children }) {
  return (
    <Grid item xs={xs} md={md}>
      <Paper 
        variant="outlined" 
        sx={{ 
          height: '100%',
          p: 2
        }}
        square
      >
        {children}
      </Paper>
    </Grid>
  )
}

function Section({ title, children }) {
  return (
    <Stack>
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

export default function AppDashboard({ 
  state, 
  onCompetitionSelect,
  onTeamSelect,
  onFormationSelect
}) {
  return (
    <Grid container spacing={2}>
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
          </Section>
        </GridPaper>)}
    </Grid>
  )
}
