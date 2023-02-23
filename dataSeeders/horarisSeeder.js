require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose');

// Importar models
const Horari = require("../models/horari");

// Carregar dades d'un CSV
const csv = require('csvtojson')

async function seeder() {
	// Esborrar contingut col·leccions
	await Horari.collection.drop();

	// Inserir dades
	const jsonObj = await csv()
			.fromFile('./dataHoraris.csv')
	horariList = await Horari.insertMany(jsonObj);
}

//
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        function () {
            console.log('Mongoose connection open');
            seeder().then(function () {
                mongoose.connection.close();
            });
        }
    )
    .catch(error => {
			console.log("when the error happened", error);
	});
