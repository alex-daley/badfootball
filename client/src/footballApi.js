import React from 'react'

export function useTeamData(competition) {
  const [teams, setTeams] = React.useState()
  const [error, setError] = React.useState()
  const [isLoading, setIsLoading] = React.useState()

  React.useEffect(() => {
    (async() => {
      setIsLoading(true)

      try {
        const res = await fetch(`/api/${competition}/teams`)
        const teams = await res.json()
        setTeams(teams)
      }
      catch (error) {
        setError(error)
      }
      finally {
        setIsLoading(false)
      }
    })()
  }, [competition])

  return {
    teams, 
    error, 
    isLoading
  }
}
