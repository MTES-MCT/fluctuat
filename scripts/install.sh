#!/bin/sh
BASEDIR=$(dirname $0)
cd $BASEDIR

git pull

echo "install api ..." &&
cd ../fluctuat-api && yarn