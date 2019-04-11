echo "launch server"

#!/bin/sh
BASEDIR=$(dirname $0)
cd $BASEDIR

cd ../fluctuat-api &&
npm run start:prod
