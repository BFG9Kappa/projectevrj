const express = require("express");
const app = express();
const port = 5556;

// Conexio a base de dades
const mongoose = require('mongoose');


app.get('/', function(req, res) {
  res.send('Prova!');
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
