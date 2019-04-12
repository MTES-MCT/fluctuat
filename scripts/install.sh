#!/bin/sh
BASEDIR=$(dirname $0)
cd $BASEDIR

echo "install api ..." &&
cd ../fluctuat-api && yarn