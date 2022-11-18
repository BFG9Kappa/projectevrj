require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose');

// 
var Horari = require("../models/horari");

// Per carregar dades d'un CSV
// const csv=require('csvtojson')

// Carregar dades de fitxers JSON
var horarisJSON = require('./provaHoraris.json');


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

    // versió per CSV
    // const jsonObj = await csv()
    //                 .fromFile('./genres.csv')     
    // genreList = await Genre.insertMany(jsonObj);

    var horaris = await Horari.insertMany(horarisJSON.horaris);  
}