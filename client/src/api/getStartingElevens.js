export default async function getStartingElevens(userId, accessToken) {
  const res = await fetch(`/api/startingeleven/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const startingElevens = await res.json()
  return startingElevens
}
