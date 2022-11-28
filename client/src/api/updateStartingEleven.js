export default async function updateStartingEleven(startingElevenId, accessToken, startingEleven) {
  const res = await fetch('/api/startingeleven', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      startingElevenId,
      startingEleven
    })
  }) 

  return res 
}
