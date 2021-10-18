// connect db with server
const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: 'postgres://cloxwrdtgkzjxo:ff4d2bd7b2562ef2e7fa05baea884c96ddb935a48c7562e719c0617e448ca3ce@ec2-3-226-165-74.compute-1.amazonaws.com:5432/daivolf39bfus5',
    ssl: {
        rejectUnauthorized: false,
    },
});

/*
const pool = new Pool({
    user: "cloxwrdtgkzjxo",
    password: "ff4d2bd7b2562ef2e7fa05baea884c96ddb935a48c7562e719c0617e448ca3ce",
    host: process.env.DATABASE_URL || 'ec2-3-226-165-74.compute-1.amazonaws.com',
    port: 5432,
    database: "daivolf39bfus5"
});
*/
module.exports = pool;