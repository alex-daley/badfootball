import axios from 'axios'
import supertest from 'supertest'
import { createApp } from './app.js'

const app = createApp()
const request = supertest(app)

jest.mock('axios')

describe('Mocked endpoint tests', () => {
  it('GET /api/competitions returns 200 status code and body', async () => {
    axios.get.mockResolvedValue({ data: { competitions: [] } })
    const res = await request.get('/api/competitions').send()  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
  })

  it('GET /api/:competition/teams returns 200 status code and body', async () => {
    axios.get.mockResolvedValue({ data: { teams: [] } })
    const res = await request.get('/api/PL/teams').send()
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
  })
})
