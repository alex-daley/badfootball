import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import StartingEleven from './StartingEleven'

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: '100vh' }} p={4} >
          <StartingEleven/>
        </Box>
      </Container>
    </React.Fragment>
  )
}
