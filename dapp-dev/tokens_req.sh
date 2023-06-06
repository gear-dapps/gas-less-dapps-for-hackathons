#!/bin/bash

password=bob

dapp_dev_addr=https://vara-dev-faucet.gear-tech.io

url=$dapp_dev_addr/tokens/request

# Request tokens for all registered users
curl --location $url --header 'Content-Type: application/json' --data '{"password": "'$password'"}'
