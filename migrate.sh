#!/bin/bash

# Run Prisma migrations using the direct connection URL
# This is needed for Supabase when using connection pooling

if [ -z "$DIRECT_URL" ]; then
    echo "Error: DIRECT_URL environment variable is not set"
    echo "Please set DIRECT_URL in your .env.local file"
    exit 1
fi

echo "Running Prisma migrations with direct connection..."
pnpm prisma migrate deploy --url "$DIRECT_URL"
