# Fluctuat web

Front-end of Fluctuat

### Technologies

 - Angular
 - Node
 - Nginx

### Prerequisites

 - NodeJS 10+
 - Yarn
 - Docker

### Run as docker container

you can run this project as docker container

    # build docker image if first time of if you have made changes
    docker build --no-cache -f Dockerfile -t fluctuat-web .

    # run fluctuat-web container
    docker run --rm --network="host" fluctuat-web

## Installation

Launch

    yarn

### Run in dev mode

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`.

The app will automatically reload if you change any of the source files.
