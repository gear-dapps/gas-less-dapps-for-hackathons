#!/bin/bash

owner_pk=5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
dapp_name=ping
email=bob@bob.bob
signature='0x1458ae5ec0112288a219aec2549730b91c0938b701bd314f7b2d8f9a23450c578ea92e5643046e910a73349495b555e5ad0d00b58c026ebfcabf51f279ad6785'

gear_backend_addr=https://vara-dev-faucet.gear-tech.io

url=$gear_backend_addr/dapp_owner/register

# Register admin
curl --location $url --header 'Content-Type: application/json' --data '{
  "publicKey": "'$owner_pk'",
  "dappName": "'$dapp_name'",
  "signature": "'$signature'",
  "email": "'$email'"
}'
