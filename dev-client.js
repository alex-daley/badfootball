const process = require('child_process')
// Go to `/client` and run npm start.
// This is for development mode. 
// In production we can run `npm run build` in the `/client` folder to build our static files that we can just serve that from our Express server.
// This idea is based on this tutorial at: https://www.newline.co/fullstack-react/articles/using-create-react-app-with-a-server/

process.spawn(
  'npm', 
  [ 'start' ], 
  { 
    stdio: 'inherit', 
    cwd: 'client', 
    shell: true 
  })
