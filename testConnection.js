const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'lending_apy',
  password: 'password',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('✅ Connected to DB successfully!');
    return client.end();
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
  });
