# Fluctuat-api

This project contains the backend which exposes the REST api consumed by the frontend

### Technologies

 - Node
 - Express
 - MongoDB
 - Docker

### Prerequisites

 - NodeJS 10+
 - Yarn
 - Docker
 - g++ (required by bcrypt dependency)

### Run as docker container

you can run as docker container.

Start a local db

     # starts a local db in a docker container
    ./scripts/start-db.js

Run as docker container

    # run init script (only the first time)
    ./scripts/init-config.js

    # build docker image if first time of if you have made changes
    docker build --no-cache -f Dockerfile -t fluctuat-api .

    # run fluctuat-api container
    docker container run --rm --network="host" -v $PWD/.data:/fluctuat-api/.data fluctuat-api

### Installation

Launch

    yarn

after install `init-config.js` are executed and it creates `./data/config.json` file.

### Run in dev mode

run script

    # starts a local db in a docker container
    yarn start:db

open other shell and start fluctuat-api in dev mode

    yarn start

Server are listening in http://localhost:9000

### Change default config

Edit file `.data/config.json` if you want to change default values.
 See doc of [AppConfig](./src/models/app-config.ts) for more details.

### Run in production

First, build for production

    yarn build

Start the server as service with pm2

    yarn start:prod
