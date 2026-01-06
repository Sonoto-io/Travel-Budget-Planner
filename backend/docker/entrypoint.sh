#!/usr/bin/env bash
set -e


echo "Setting Prisma up..."
bunx prisma generate
bunx prisma migrate deploy
echo "Populating database..."
cd /app/prisma
DATABASE_URL=$DATABASE_URL bun run populate_db.ts

cd /app
echo "Starting backend..."
bun run --watch index.ts