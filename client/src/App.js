import React from 'react'

export default function App() {
  const [competitions, setCompetitions] = React.useState()

  React.useEffect(() => {
    fetch('/api/competitions').then(async res => {
      const competitions = await res.json()
      setCompetitions(competitions)
    })
  }, [])
  
  return (
    <div>
      <header>
        <h1>Badfootball</h1>
      </header> 
    </div>
  )
}
