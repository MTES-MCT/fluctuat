#!/bin/sh
BASEDIR=$(dirname $0)
cd $BASEDIR

git pull

echo "build webapp ..." &&
cd ../fluctuat-web && yarn && yarn build --prod &&

echo "build api ..." &&
cd ../fluctuat-api && yarn && yarn build