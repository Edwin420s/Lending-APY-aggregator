# Lending-APY-aggregator
# Lending APY Aggregator Backend

## Overview
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

1. Clone the repository:
   ```bash
   git clone https://github.com/Edwin420s/lending-apy-aggregator.git
   cd lending-apy-aggregator

lending-apy-aggregator/
├── src/
│   ├── app.js
│   ├── routes/
│   │   └── api.js
│   ├── services/
│   │   ├── alertService.js
│   │   └── dataAggregator.js
│   ├── jobs/
│   │   └── dataFetchingJob.js
│   └── ...
├── prisma/
│   └── schema.prisma
├── .env
├── docker-compose.yml
├── package.json
├── README.md
└── ...
