require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

// Importar models
const Baixa = require("../models/baixamedica");

// Carregar dades d'un CSV
const csv = require("csvtojson");

async function seeder() {
	// Esborrar contingut col·leccions
	await Baixa.collection.drop();
	// Inserir dades
	const jsonObj = await csv().fromFile("./dataBaixes.csv");
	baixaList = await Baixa.insertMany(jsonObj);
}

const mongoDB = process.env.MONGODB_URI;
mongoose
	.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function () {
		console.log("Sembrant: Baixes mediques");
		seeder().then(function () {
			mongoose.connection.close();
		});
	})
	.catch((error) => {
		console.log("when the error happened", error);
	});
