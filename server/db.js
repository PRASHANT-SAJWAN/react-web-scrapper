// connect db with server
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "One23four5@",
    host: "localhost",
    port: 5000,
    database: "blogs"
});

module.exports = pool;