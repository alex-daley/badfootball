export default async function saveStartingEleven(token, userId, startingEleven) {
  const res = await fetch('/api/startingeleven', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      userId,
      startingEleven
    })
  }) 

  return res
}
