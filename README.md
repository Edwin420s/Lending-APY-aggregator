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

## 📁 Project Structure
lending-apy-aggregator/

├── src/

│ ├── app.js # Main server

│ ├── routes/api.js # API endpoints

│ ├── services/

│ │ ├── alertService.js # WebSocket alerts

│ │ └── dataAggregator.js # Blockchain data fetch

│ └── jobs/dataFetchingJob.js

├── prisma/schema.prisma # Prisma DB schema

├── .env # Environment variables

├── docker-compose.yml # Docker config

├── package.json # Project dependencies

└── README.md # Project documentation


---

## 🚀 How to Run the Project

1. Clone the repository
2. Install dependencies
3. Set up `.env` file
4. Run `docker compose up -d` for DB & Redis
5. Run `npx prisma migrate dev --name init`
6. Start the server with `nodemon src/app.js`

---

## ✅ API Endpoints

- `GET /api/rates` — all lending rates
- `GET /api/rates/:asset` — lending rates for a specific token (e.g. AVAX)

---

## 📡 WebSocket Alerts

Connect to `ws://localhost:8081` and subscribe to live APY change alerts.

---

## 👨‍💻 Author

**Edwin Mwiti**  
GitHub: [@Edwin420s](https://github.com/Edwin420s)  
Email: eduedwyn5@gmail.com
