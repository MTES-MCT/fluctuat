#!/bin/sh

pem_key=$(mktemp)

echo "$SSH_KEY" > "$pem_key"
ssh-keyscan $CI_HOST >> ~/.ssh/known_hosts
ssh -i $pem_key $CI_USER@$CI_HOST "./fluctuat/scripts/install.sh"
ssh -i $pem_key $CI_USER@$CI_HOST "./fluctuat/scripts/run.sh"

#rm -f $pem_key