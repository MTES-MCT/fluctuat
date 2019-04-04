# fluctuat-api

# Prerequisites

   bcrypt requires g++ (included in build-essential ubuntu package ubuntu)

   or

   yum install gcc

# Installation

Run the command

    yarn

After install set up the config vars at `.data/config.json`

## Run in dev mode

Start the server with a live reload daemon

    yarn start

## Run in production

Before run you should to build `yarn build`

Start the server as service with pm2

    yarn start:prod


docker build --no-cache -f Dockerfile -t fluctuat-api .
docker run --network="host" fluctuat-api
