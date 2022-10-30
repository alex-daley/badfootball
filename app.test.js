const axios = require('axios') 
const supertest = require('supertest')
const createApp = require('./app')

const app = createApp()
const request = supertest(app)

jest.mock('axios')
jest.mock('mariadb')

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
