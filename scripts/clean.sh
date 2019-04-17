#!/bin/sh
echo "cleaning fluctuat..."

BASEDIR=$(dirname $0)
cd $BASEDIR

rm -fr ../fluctuat-web/dist &&
rm -fr ../fluctuat-api/dist &&

echo "clean done!"