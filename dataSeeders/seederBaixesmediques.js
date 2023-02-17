require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose');

// Importar models
var Baixa = require("../models/baixamedica");

// Carregar dades d'un CSV
const csv = require('csvtojson')

var mongoDB = process.env.MONGODB_URI;
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

async function seeder() {
    // Esborrar contingut col·leccions
    await Baixa.collection.drop();

    // Inserir dades
    const jsonObj = await csv()
        .fromFile('./dataBaixes.csv')
    baixaList = await Baixa.insertMany(jsonObj);
}