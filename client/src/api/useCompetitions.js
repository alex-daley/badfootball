import React from 'react'

export default function useCompetitions() {
  const [competitions, setCompetitions] = React.useState()
  const [error, setError] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    (async() => {
      setIsLoading(true)

      try {
        const res = await fetch(`/api/competitions`)
        const competitions = await res.json() 
        setCompetitions(competitions)
      }
      catch (error) {
        setError(error)
      }
      finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return { competitions, error, isLoading }
}
