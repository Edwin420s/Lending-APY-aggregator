// src/services/alertService.js
const { PrismaClient } = require('@prisma/client');
const WebSocket = require('ws');
const { ethers } = require('ethers');
const prisma = new PrismaClient();

class AlertService {
  constructor() {
    this.wss = new WebSocket.Server({ port: 8081 });
    this.connectedClients = new Map();
    this.setupWebSocket();
    this.setupAlertChecks();
  }

  setupWebSocket() {
    this.wss.on('connection', (ws, req) => {
      const userId = req.headers['user-id']; // In real app, use proper auth
      this.connectedClients.set(userId, ws);
      
      ws.on('close', () => {
        this.connectedClients.delete(userId);
      });
    });
  }

  async setupAlertChecks() {
    setInterval(async () => {
      const alerts = await prisma.alert.findMany({
        include: {
          user: true
        }
      });
      
      const currentRates = await prisma.lendingRate.findMany({
        where: {
          timestamp: {
            gte: new Date(Date.now() - 5 * 60 * 1000)
          }
        },
        orderBy: {
          timestamp: 'desc'
        },
        distinct: ['platform', 'asset']
      });
      
      for (const alert of alerts) {
        const relevantRates = currentRates.filter(rate => 
          rate.asset === alert.asset && 
          (!alert.platform || rate.platform === alert.platform)
        );
        
        for (const rate of relevantRates) {
          if (alert.condition === 'ABOVE' && rate.apy > alert.threshold) {
            this.triggerAlert(alert, rate);
          } else if (alert.condition === 'BELOW' && rate.apy < alert.threshold) {
            this.triggerAlert(alert, rate);
          }
        }
      }
    }, 30000); // Check every 30 seconds
  }

  triggerAlert(alert, rate) {
    const message = {
      type: 'ALERT',
      alertId: alert.id,
      message: `Alert: ${rate.asset} on ${rate.platform} is now ${rate.apy}% APY`,
      rate
    };
    
    // Send via WebSocket if connected
    const client = this.connectedClients.get(alert.userId);
    if (client) {
      client.send(JSON.stringify(message));
    }
    
    // TODO: Implement email notification
  }
}

module.exports = AlertService;