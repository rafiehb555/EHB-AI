
const { Pool } = require('pg');

// Create a new pool instance using the DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Export the pool to be used throughout the application
module.exports = {
  pool,
  
  // Helper function to run queries
  query: (text, params) => pool.query(text, params),
  
  // Helper function to get a client from the pool
  getClient: async () => {
    const client = await pool.connect();
    return client;
  }
};
