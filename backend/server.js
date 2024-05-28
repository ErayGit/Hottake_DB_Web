const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../dist/hottake-db-web')));

let server = app.listen('8020', function (){
  console.log("[Server Initialized on Port 8020]")
})
