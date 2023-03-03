require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Baixa = require("../models/baixamedica"); // Importar models
const BaixaJSON = require("./baixesmediquesData.json"); // Carregar dades de fitxers JSON

async function seeder() {
	await Baixa.collection.drop(); // Esborrar contingut col·leccions
	await Baixa.insertMany(BaixaJSON.baixesmediquesData); // Inserir dades
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
