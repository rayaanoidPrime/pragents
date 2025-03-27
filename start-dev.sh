#!/bin/bash

# Start development setup

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Start n8n in Docker
echo "Starting n8n..."
docker-compose up -d n8n

# Wait for n8n to start
echo "Waiting for n8n to start..."
sleep 10

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Start the application in development mode
echo "Starting the application..."
pnpm run dev

# Cleanup function
cleanup() {
    echo "Stopping services..."
    docker-compose down
    exit 0
}

# Register cleanup function
trap cleanup INT TERM

# Keep the script running
wait