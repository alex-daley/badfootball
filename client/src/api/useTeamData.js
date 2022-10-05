import React from 'react'

export default function useTeamData(competition) {
  const [teams, setTeams] = React.useState()
  const [error, setError] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (!competition) return

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

  return { teams, error, isLoading }
}
