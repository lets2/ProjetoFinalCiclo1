const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.SQL_USER,
    host: process.env.SQL_HOST,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    max: 20,
});

module.exports = pool;
