import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import WrappedSelect from './WrappedSelect'
import WrappedSpan from './WrappedSpan'
import useTeamData from '../api/useTeamData' 
import useFormations from '../api/useFormations'

function TeamBuilderGrid({ teams, formations }) {
  const [teamName, setTeamName] = useState(teams[0].name)
  const [formationName, setFormationName] = useState(Object.keys(formations)[0])

  const team = teams.find(team => team.name === teamName)
  console.log(team)

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <WrappedSelect 
          label="team" 
          value={teamName} 
          values={teams.map(team => team.name)} 
          onChange={setTeamName}
        />
      </Grid>
      <Grid item xs={4}>
        <WrappedSelect 
          label="formation" 
          value={formationName} 
          values={Object.keys(formations)} 
          onChange={setFormationName} 
        />
      </Grid>
      <Grid item xs={12}>
        <Divider/>
        
        <Box mx={1} my={2} sx={{ display: 'flex', justifyContent: 'start' }}>
          <Typography variant="body2">
            Build your <WrappedSpan text={teamName}/>  <WrappedSpan text={formationName} secondary/> dream team!
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

function TeamBuilderControl({ competitionCode }) {
  const { isLoading, teams } = useTeamData(competitionCode)
  const { formations } = useFormations()

  if (isLoading) return <></>

  return <TeamBuilderGrid teams={teams} formations={formations}/>
}

export default function TeamBuilder({ competition }) {
  if (!competition) {
    return (
      <Typography variant="h5">
        Please select a competition.
      </Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h5">{competition.name}</Typography>
      <Box mt={2}>
        <TeamBuilderControl competitionCode={competition.code} />
      </Box>
    </Box>
  )
}
