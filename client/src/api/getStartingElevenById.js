export default async function getStartingElevenById(id) {
  const res = await fetch(`/api/startingeleven/shared/${id}`, {
    method: 'GET'
  })

  try {
    const startingEleven = await res.json()
    return startingEleven
  }
  catch {
    return null
  }
}
