#!/bin/bash
# Startup script for the Vehicles API

# Check if required environment variables are set
if [ -z "$JWT_SECRET" ]; then
  echo "ERROR: JWT_SECRET environment variable is not set"
  exit 1
fi

if [ -z "$REFRESH_SECRET" ]; then
  echo "ERROR: REFRESH_SECRET environment variable is not set"
  exit 1
fi

if [ -z "$DB_USER" ]; then
  echo "ERROR: DB_USER environment variable is not set"
  exit 1
fi

if [ -z "$DB_PASSWORD" ]; then
  echo "ERROR: DB_PASSWORD environment variable is not set"
  exit 1
fi

if [ -z "$DB_NAME" ]; then
  echo "ERROR: DB_NAME environment variable is not set"
  exit 1
fi

if [ -z "$DB_HOST" ]; then
  echo "ERROR: DB_HOST environment variable is not set"
  exit 1
fi

# Build the application
echo "Building the application..."
npm run build

# Start the application
echo "Starting the application..."
npm start