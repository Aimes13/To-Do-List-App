const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((error) => {
  if(error) {
      console.log(error)
  } else {
      console.log("My database connected!")
  }
});

module.exports = pool;
