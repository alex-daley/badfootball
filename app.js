const fs = require('path')
const express = require('express')
const { auth } = require('express-oauth2-jwt-bearer')
const api = require('./external-football-api')
const Cache = require('./cache')
 
require('dotenv').config()

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

const checkJwt = auth({
  audience: 'https://ws325813-atw2.remote.ac/api/',
  issuerBaseURL: `https://ws325813-atw2.eu.auth0.com/`
})

module.exports = function createApp() {
  checkEnvironmentVariables() 
  
  const app = express()
  const cache = new Cache()

  const buildPath = fs.join(__dirname, 'build')
  console.log(`Serving client from: ${buildPath}`)
  app.use(express.static(buildPath))

  app.get('/', (_, res) => {
    res.sendFile(fs.join(buildPath, 'index.html'))
  })
  
  app.get('/api/competitions', async(_, res) => {
    const competitions = await cache.getLazy('COMPETITIONS', api.fetchCompetitions)
    res.json(competitions)
  })
  
  app.get('/api/:competition/teams', async(req, res) => {
    const { competition } = req.params
    const teams = await cache.getLazy(`TEAMS/${competition}`, async () => {
      return await api.fetchTeamsForCompetition(competition)
    })

    res.json(teams)
  })

  app.get('/api/private', checkJwt, async(_, res) => {
    res.send('You can only see this if you are authenticated')
  })

  return app
}
