#!/bin/bash

echo "starting db ..."

# docker compose up -d
docker start noted-postgres

echo "Starting Server ..."
pnpm dev