const createApp = require('./app')
const http = require('http')

const port = 3001
const app = createApp()

http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`)
})
