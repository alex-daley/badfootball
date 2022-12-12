# Build Instructions

### Environement Variables

Create a file called `.env` in `./`, this needs to have the following variables:

- FOOTBALL_API_TOKEN # API key for https://www.football-data.org/
- FOOTBALL_API_DOMAIN
- DB_PASSWORD  # MariaDB password

Create a file called `.env` in ./client, this needs to have the following varialbes:

- REACT_APP_AUTH0_CLIENT_ID # Find these from the Auth0 portal
- REACT_APP_AUTH0_DOMAIN
- REACT_APP_AUTH0_AUDIENCE


### To Install Dependencies

1. run `npm i` in `./`
2. run `npm i` in `./client`

### Run Locally

1. run `npm start` in `./`

### Create a Production Build

1. run `sh pleskbuild.sh` in `./`
