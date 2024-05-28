require('dotenv').config();

const mysql = require('mysql');
const conPool = mysql.createPool({
  connectionLimit : 10,
  database: process.env.MYSQL_HOST_DATABASE, // sensible Daten wurden in die .env Datei ausgelagert
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_HOST_USER,
  password: process.env.MYSQL_HOST_PASSWORD
})

module.exports = conPool;
