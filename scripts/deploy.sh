#!/bin/sh

pem_key=$(mktemp)
echo "$SSH_KEY" > "$pem_key"
ssh-keyscan $CI_HOST >> ~/.ssh/known_hosts

BASEDIR=$(dirname $0)
cd $BASEDIR

ssh -i $pem_key $CI_USER@$CI_HOST "./fluctuat/scripts/clean.sh" &&
scp -i $pem_key -pr ../fluctuat-web/dist $CI_USER@$CI_HOST:fluctuat/fluctuat-web/ &&
scp -i $pem_key -pr ../fluctuat-api/dist $CI_USER@$CI_HOST:fluctuat/fluctuat-api/ &&
ssh -i $pem_key $CI_USER@$CI_HOST "./fluctuat/scripts/install.sh"
ssh -i $pem_key $CI_USER@$CI_HOST "./fluctuat/scripts/run.sh"

#rm -f $pem_key