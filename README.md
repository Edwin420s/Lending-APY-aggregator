# Lending-APY-Aggregator

## Overview
Lending APY Aggregator Backend

This project is a backend service for a Lending APY Aggregator platform. It collects, stores, and serves Annual Percentage Yield (APY) data from various DeFi lending platforms on the Avalanche network. The backend also supports alert notifications via WebSocket and job scheduling with Redis and Bull.

---

## Author
**Edwin420s**

---

## Features
- Fetch lending APY data from blockchain platforms
- Store data in PostgreSQL database using Prisma ORM
- REST API to expose lending rates
- Background jobs to periodically update data
- WebSocket-based alert service for notifying users
- Docker Compose setup for PostgreSQL and Redis

---

## Tech Stack
- Node.js + Express
- PostgreSQL
- Prisma ORM
- Redis + Bull (for job queues)
- WebSocket
- Docker Compose

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- Docker & Docker Compose
- Redis (can be run via Docker)
- PostgreSQL (can be run via Docker)

### Installation & Setup

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/Edwin420s/lending-apy-aggregator.git
cd lending-apy-aggregator
npm install
``
Project Structure:

lending-apy-aggregator/
├── src/
│   ├── app.js                # Main server file
│   ├── routes/
│   │   └── api.js            # API endpoints
│   ├── services/
│   │   ├── alertService.js    # WebSocket alert service
│   │   └── dataAggregator.js # Blockchain data fetching service
│   └── jobs/
│       └── dataFetchingJob.js # Scheduled background job for data fetching
├── prisma/
│   └── schema.prisma         # Prisma database schema
├── .env                     # Environment variables
├── docker-compose.yml        # Docker configuration for PostgreSQL & Redis
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation

.env

DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/lending_apy?schema=public"
AVALANCHE_RPC_URL="https://api.avax.network/ext/bc/C/rpc"
REDIS_URL="redis://localhost:6379"
PORT=3000

