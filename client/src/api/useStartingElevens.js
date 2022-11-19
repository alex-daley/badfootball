import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function useStartingElevens() {
  const [startingElevens, setStartingElevens] = useState([])
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) return

    (async () => {
      setIsLoading(true)

      try {
        const token = await getAccessTokenSilently()
        const res = await fetch(`/api/startingeleven/${user.sub}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const startingElevens = await res.json() 
        setStartingElevens(startingElevens)
      }
      catch (error) {
        setError(error)
      }
      finally {
        setIsLoading(false)
      }
    })()
  }, [isAuthenticated, user, getAccessTokenSilently])

  return { startingElevens, error, isLoading }
}
