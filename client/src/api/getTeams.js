export default async function getTeams(competitionCode) {
  const res = await fetch(`/api/${competitionCode}/teams`)
  const teams = await res.json()
  return teams
}
