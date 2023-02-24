require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

// Importar models
const AbsPrevista = require("../models/absprevista");

// Carregar dades de fitxers JSON
const absPrevistaJSON = require("./dataAbsenciesPrevistes.json");

async function seeder() {
	// Esborrar contingut col·leccions
	await AbsPrevista.collection.drop();
	// Inserir dades
	var absPrevista = await AbsPrevista.insertMany(absPrevistaJSON.abs);
}

var mongoDB = process.env.MONGODB_URI;
mongoose
	.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function () {
		console.log("Sembrant: Absencies previstes");
		seeder().then(function () {
			mongoose.connection.close();
		});
	})
	.catch("when the error happened");
