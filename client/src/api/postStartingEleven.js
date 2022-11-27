export default async function postStartingEleven(userId, accessToken, startingEleven) {
  const res = await fetch('/api/startingeleven', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      userId,
      startingEleven
    })
  }) 

  return res 
}
