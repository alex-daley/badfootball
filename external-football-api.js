import axios from 'axios' 
import * as dotenv from 'dotenv'

dotenv.config()

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

export async function getCompetitions() {
  const res = await axios(v4Route('competitions'), authHeader())
  const { competitions } = res.data 

  return competitions.map(competition => ({
    name: competition.name,
    code: competition.code,
    emblem: competition.emblem
  }))
}

export async function getTeamsForCompetition(competitionCode) {
  const res = await axios(v4Route(`competitions/${competitionCode}/teams`), authHeader())
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
