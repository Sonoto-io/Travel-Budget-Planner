#!/usr/bin/env bash
set -e


echo "Setting Prisma up..."
bunx prisma generate
bunx prisma migrate deploy

echo "Starting backend..."
bun run --watch index.ts