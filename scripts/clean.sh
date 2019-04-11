#!/bin/sh
echo "clean build"

BASEDIR=$(dirname $0)
cd $BASEDIR

rm -fr ../fluctuat-web/dist &&
rm -fr ../fluctuat-api/dist