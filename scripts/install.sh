#!/bin/sh

echo "build webapp ..." &&
cd ../fluctuat-web && yarn && yarn build --prod &&

echo "build backend ..." &&
cd ../fluctuat-backend && npm ci