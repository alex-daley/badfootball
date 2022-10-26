const axios = require('axios')

require('dotenv').config()

function authHeader() {
  const token = process.env.FOOTBALL_API_TOKEN
  return {
    headers: {
      'X-Auth-Token': token
    }
  }
}

function v4Route(route) {
  return `${process.env.FOOTBALL_API_DOMAIN}/v4/${route}`
}

async function fetchCompetitions() {
  const res = await axios.get(v4Route('competitions'), authHeader())
  const { competitions } = res.data 

  return competitions.map(competition => ({
    name: competition.name,
    code: competition.code,
    emblem: competition.emblem,
    country: competition.area.name,
    startDate: competition.currentSeason.startDate,
    endDate: competition.currentSeason.endDate
  }))
}

async function fetchTeamsForCompetition(competitionCode) {
  const res = await axios.get(v4Route(`competitions/${competitionCode}/teams`), authHeader())
  const { teams } = res.data

  return teams.map(team => ({
    name: team.name,
    tla: team.tla,
    crest: team.crest,
    squad: team.squad.map(player => ({
      name: player.name,
      position: player.position
    }))
  }))
}

module.exports = {
  fetchCompetitions,
  fetchTeamsForCompetition
}
