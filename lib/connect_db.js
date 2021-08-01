const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASS,
        database: 'emp_tracker_db'
    }
);

db.connect((err) => err ? console.log(err) : console.log('Database connected'));

module.exports = db;