#!/bin/bash

echo "starting db ..."

docker compose up -d

echo "Starting Server ..."
pnpm dev