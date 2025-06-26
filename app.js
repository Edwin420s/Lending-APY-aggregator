// src/app.js
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const DataAggregator = require('./services/dataAggregator');
const AlertService = require('./services/alertService');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Initialize services
const aggregator = new DataAggregator(process.env.AVALANCHE_RPC_URL);
const alertService = new AlertService();

// Initial data fetch
aggregator.updateAllPlatforms()
  .then(() => console.log('Initial data fetch complete'))
  .catch(err => console.error('Initial data fetch failed:', err));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});