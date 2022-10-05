import React from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import StartingXIGrid from './StartingXIGrid'
import CompetitionSelect from './CompetitionSelect'
import Footer from './Footer'
import useCompetitions from '../api/useCompetitions'
import useTeamData from '../api/useTeamData'
import useFormations from '../api/useFormations'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={  <CompetitionSelectPage/>}/> 
        <Route path="/xi/:competition" element={<StartingXIPage/>}/>
      </Routes>
    </Router>
  )
}

function PageContainer(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ height: '100vh' }} p={8}>
          {props.children}
        </Box>
      </Container> 
      <Footer /> 
    </React.Fragment>
  )
}

function CompetitionSelectPage() {
  const { competitions, isLoading } = useCompetitions() 

  if (isLoading) {
    return <React.Fragment/>
  }

  return (
    <PageContainer>
      <Stack sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} spacing={2}>
        <CompetitionSelect competitions={competitions}/>
      </Stack>
    </PageContainer>
  )
}

function StartingXIPage() { 
  const { competition } = useParams() 
  const { teams, isLoading } = useTeamData(competition)
  const { formations } = useFormations()
  
  if (isLoading) {
    return <React.Fragment/>
  }

  return (
    <PageContainer>
      <Stack sx={{ height: '100%' }} spacing={2}>
        <StartingXIGrid formations={formations} teams={teams} />
      </Stack>
    </PageContainer>
  )
}
