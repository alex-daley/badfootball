import express from 'express'
import * as dotenv from 'dotenv'
import { fetchCompetitions, fetchTeamsForCompetition } from './external-football-api.js'
import Cache from './cache.js'

dotenv.config()

function checkEnvironmentVariables() {
  let errors = []
  if (!process.env.FOOTBALL_API_TOKEN)  {
    errors.push('FOOTBALL_API_TOKEN is not defined')
  }
  
  if (!process.env.FOOTBALL_API_DOMAIN) {
    errors.push('FOOTBALL_API_DOMAIN is not defined')
  }
  
  if (errors.length > 0) {
    errors.push('Define these variables in a file named .env at this project\'s root folder.')
    throw Error(errors.join('\n'))
  }
}

export function createApp() {
  checkEnvironmentVariables() 
  
  const app = express()
  const cache = new Cache()
  
  app.get('/api/competitions', async(_, res) => {
    const competitions = await cache.getLazy('COMPETITIONS', fetchCompetitions)
    res.json(competitions)
  })
  
  app.get('/api/:competition/teams', async(req, res) => {
    const { competition } = req.params
    const teams = await cache.getLazy(`TEAMS/${competition}`, async () => {
      return await fetchTeamsForCompetition(competition)
    })

    res.json(teams)
  })

  return app
}
