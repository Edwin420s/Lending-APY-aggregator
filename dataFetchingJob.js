// src/jobs/dataFetchingJob.js
const Bull = require('bull');
const DataAggregator = require('../services/dataAggregator');

const dataQueue = new Bull('data-fetching', {
  redis: process.env.REDIS_URL
});

// Add job to queue every 60 seconds
setInterval(() => {
  dataQueue.add({}, { repeat: { every: 60000 } });
}, 60000);

dataQueue.process(async (job) => {
  const aggregator = new DataAggregator(process.env.AVALANCHE_RPC_URL);
  await aggregator.updateAllPlatforms();
  console.log('Successfully updated platform data');
});

module.exports = dataQueue;