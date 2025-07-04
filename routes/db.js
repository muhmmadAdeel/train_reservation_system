
require('dotenv').config({ path: 'test.env' });
const sql = require('mssql/msnodesqlv8');

const config = {
  server: process.env.DB_SERVER || 'ADEEL',
  database: process.env.DB_NAME || 'railway_reservation_system',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true
  }
};





async function connectDB() {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
    return sql;
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

module.exports = { sql, config, connectDB };



