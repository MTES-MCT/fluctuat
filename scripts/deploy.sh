#!/bin/sh

pem_key = $(mktemp)

printf $SSH_KEY > $pem_key
ssh -i $pem_key $CI_HOST "/fluctuat/scripts/install.sh"
ssh -i $pem_key $CI_HOST "/fluctuat/scripts/run.sh"

rm -f $pem_key