const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // {TODO: Add your MySQL password}
      password: process.env.secret,
      database: 'etrack'
    },
    console.log(`Connected to the tracker database.`)
  );

module.exports = db;