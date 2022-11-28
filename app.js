const fs = require('path')
const express = require('express')
const { auth } = require('express-oauth2-jwt-bearer')
const api = require('./external-football-api')
const db = require('./db')
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
  
  if (!process.env.DB_PASSWORD) {
    errors.push('DB_PASSWORD is not defined')
  }

  if (errors.length > 0) {
    errors.push('Define these variables in a file named .env at this project\'s root folder.')
    throw Error(errors.join('\n'))
  }
}

let checkJwt = auth({
  audience: ['https://ws325813-atw2.remote.ac/api/'],
  issuerBaseURL: `https://ws325813-atw2.eu.auth0.com/`
})

module.exports = function createApp() {
  checkEnvironmentVariables() 
  
  const app = express()
  const cache = new Cache()
  const { 
    insertStartingEleven, 
    getStartingElevens, 
    deleteStartingEleven, 
    updateStartingEleven 
  } = db()

  const buildPath = fs.join(__dirname, 'build')
  console.log(`Serving client from: ${buildPath}`)
  app.use(express.static(buildPath))

  app.use(express.json()) 

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

  app.post('/api/startingeleven', async(req, res) => {
    const { userId, startingEleven } = req.body 
    try {
      const insertId = await insertStartingEleven(userId, startingEleven) 
      res.status(201).json({ insertId })
    }
    catch(err) {
      console.log(err)
      res.status(500).send('Internal server error')
    }
  }) 

  app.put('/api/startingeleven', async(req, res) => {
    const { startingElevenId, startingEleven } = req.body 
    try {
      await updateStartingEleven(startingElevenId, startingEleven) 
      res.status(201).json({ startingElevenId })
    }
    catch(err) {
      console.log(err)
      res.status(500).send('Internal server error')
    }
  }) 


  app.get('/api/startingeleven/:userId', async(req, res) => {
    const { userId } = req.params
     
    try {
      const rows = await getStartingElevens(userId) 
      res.json(rows)
    }
    catch(err) {
      console.log(err)
      res.status(500).send('Internal server error')
    }
  })

  app.delete('/api/startingeleven/:startingElevenId', async(req, res) => {
    const { startingElevenId } = req.params
     
    try {
      await deleteStartingEleven(startingElevenId) 
      res.status(202).send()
    }
    catch(err) {
      console.log(err)
      res.status(500).send('Internal server error')
    }
  })

  return app
}
