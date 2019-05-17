#!/bin/sh

pem_key=$(mktemp)
echo "$SSH_KEY" > "$pem_key"
ssh-keyscan $CI_HOST >> ~/.ssh/known_hosts

BASEDIR=$(dirname $0)
cd $BASEDIR

echo "update git in host ..." &&
# ensure HEAD is up to date with 'origin/master'
ssh -i $pem_key $CI_USER@$CI_HOST "cd fluctuat && git fetch origin master && git checkout -f master && git reset --hard origin/master"
ssh -i $pem_key $CI_USER@$CI_HOST "./fluctuat/scripts/clean.sh" &&
echo "deploy build ..." &&
scp -i $pem_key -pr ../fluctuat-web/dist $CI_USER@$CI_HOST:fluctuat/fluctuat-web/ &&
scp -i $pem_key -pr ../fluctuat-api/dist $CI_USER@$CI_HOST:fluctuat/fluctuat-api/ &&
ssh -i $pem_key $CI_USER@$CI_HOST "./fluctuat/scripts/install.sh" &&
sh $BASEDIR/build-env-file.sh > .env &&
scp -i $pem_key -pr .env $CI_USER@$CI_HOST:fluctuat/fluctuat-api/ &&
ssh -i $pem_key $CI_USER@$CI_HOST "./fluctuat/scripts/run.sh"

rm -f $pem_key
