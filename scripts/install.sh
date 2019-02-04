#!/bin/sh

echo "build webapp ..." &&
cd ../fluctuat-web && yarn && yarn build --prod &&

echo "build api ..." &&
cd ../fluctuat-api && yarn && yarn build