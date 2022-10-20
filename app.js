const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 5556;

// Conexio a base de dades - Implementar
const mongoose = require('mongoose');

// Ruta de les vistes
app.set('views',path.join(__dirname,'views'));
// Selecciona motor de plantilles EJS
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  //res.send('Prova!');
  res.render('pages/index'); // Retorna la vista 
});


const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

