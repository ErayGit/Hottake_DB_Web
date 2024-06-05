require('dotenv').config();

var mysql = require('mysql2');
var conPool = mysql.createPool({
  connectionLimit : 10,
  database: process.env.MYSQL_DATABASE, // sensible Daten wurden in die .env Datei ausgelagert
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  nestTables: true
});

module.exports = conPool;
