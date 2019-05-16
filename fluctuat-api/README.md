# Fluctuat-api

This project contains the backend which exposes the REST api consumed by the frontend

### Technologies

 - Node
 - Express
 - MongoDB
 - Docker
 - PM2

### Prerequisites

 - NodeJS 10+
 - Yarn
 - Docker
 - g++ (required by bcrypt dependency)
 - libcurl3 (required by mongodb-memory-server)

### Run as docker container

you can run as docker container.

Start a local db

     # starts a local db in a docker container
    ./scripts/start-db.js

Run as docker container

    # run init script (only the first time)
    ./scripts/init-env.js

    # build docker image if first time of if you have made changes
    docker build --no-cache -f Dockerfile -t fluctuat-api .

    # run fluctuat-api container
    docker container run --rm --network="host" --env-file=.env fluctuat-api

### Installation

Launch

    yarn

after install `init-env.js` are executed and it creates `.env` file.

### Run in dev mode

run script

    # starts a local db in a docker container
    yarn start:db

open other shell and start fluctuat-api in dev mode

    yarn start

Server are listening in http://localhost:9000

### Change default config

Set up env values editing `.env` file. See jsdoc of [AppConfig](./src/app.config.ts) for more details.

### Run in production

First, build for production

    yarn build

Start the server as service with pm2

    yarn start:prod
