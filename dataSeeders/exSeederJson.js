require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose');

// Importar models
var Horari = require("../models/horari");

// Carregar dades de fitxers JSON
var horarisJSON = require('./exDataHoraris.json');

// 
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.Promise = global.Promise;
//var db = mongoose.connection;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        function () {
            console.log('Mongoose connection open');
            seeder().then(function () {
                mongoose.connection.close();
            });
        }
    )
    .catch("when the error happened")

/*
db.on('connected', function () {
  console.log('Mongoose connection open'); 
  
  seeder().then( function() {
    mongoose.connection.close();
  });

});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

*/

async function seeder() {
    // Esborrar contingut col·leccions
    await Horari.collection.drop();

    // Inserir dades
    var horaris = await Horari.insertMany(horarisJSON.horaris);
}