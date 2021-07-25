const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Preston1',
        database: 'emp_tracker_db'
    }
);

db.connect((err) => err ? console.log(err) : console.log('Database connected'));

module.exports = db;