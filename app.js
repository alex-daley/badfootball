import * as footballApi from './external-football-api.js'
import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

function checkEnviromentVariables() {
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
  checkEnviromentVariables() 
  
  const app = express()
  
  app.get('/api/competitions', async(_, res) => {
    const competitions = await footballApi.getCompetitions()
    res.json(competitions)
  })
  
  app.get('/api/:competition/teams', async(req, res) => {
    const { competition } = req.params
    const competitions = await footballApi.getTeamsForCompetition(competition)
    res.json(competitions)
  })

  return app
}
