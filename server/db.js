// connect db with server
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "One23four5@",
    host: "localhost",
    port: 5432,
    database: "blogs"
});

module.exports = pool;