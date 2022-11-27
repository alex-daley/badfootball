export default async function deleteStartingEleven(accessToken, startingElevenId) {
  const res = await fetch(`/api/startingeleven/${startingElevenId}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${accessToken}`
    }
  }) 

  return res 
}
