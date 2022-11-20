export default async function getCompetitions() {
  const res = await fetch(`/api/competitions`)
  const competitions = await res.json()
  return competitions
}
