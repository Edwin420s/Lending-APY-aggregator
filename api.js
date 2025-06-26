// src/routes/api.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get current rates for all platforms
router.get('/rates', async (req, res) => {
  try {
    const rates = await prisma.lendingRate.findMany({
      where: {
        timestamp: {
          // Get rates from the last 5 minutes
          gte: new Date(Date.now() - 5 * 60 * 1000)
        }
      },
      orderBy: {
        timestamp: 'desc'
      },
      distinct: ['platform', 'asset'] // Get only the latest for each platform/asset
    });
    
    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
});

// Get rates for a specific asset
router.get('/rates/:asset', async (req, res) => {
  const { asset } = req.params;
  
  try {
    const rates = await prisma.lendingRate.findMany({
      where: {
        asset: asset.toUpperCase(),
        timestamp: {
          gte: new Date(Date.now() - 5 * 60 * 1000)
        }
      },
      orderBy: {
        apy: 'desc'
      },
      distinct: ['platform']
    });
    
    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
});

module.exports = router;