import { createApp } from './app.js'

const port = 3001
const app = createApp()

app.listen(port, () => {
  console.log(`Badfootball app listening on port ${port}`)
})
