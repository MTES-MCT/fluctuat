#!/bin/sh
BASEDIR=$(dirname $0)
cd $BASEDIR

echo "building fluctuat-api..." &&
cd ../fluctuat-api && yarn build &&

echo "building fluctuat-web..." &&
cd ../fluctuat-web && yarn build --prod &&

echo "Done!"