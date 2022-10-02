
import * as footballApi from './external-football-api.js'
import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = 3001

app.get('/api/competitions', async(_, res) => {
  const competitions = await footballApi.getCompetitions()
  res.json(competitions)
})

app.get('/api/:competition/teams', async(req, res) => {
  const { competition } = req.params
  const competitions = await footballApi.getTeamsForCompetition(competition)
  res.json(competitions)
})

app.listen(port, () => {
  console.log(`Badfootball app listening on port ${port}`)
})
