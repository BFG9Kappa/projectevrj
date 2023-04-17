require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const AbsNoPrevista = require("../models/absnoprevista");
const absNoPrevistaJSON = require("./absnoprevistesData.json");

async function seeder() {
	await AbsNoPrevista.collection.drop();
	await AbsNoPrevista.insertMany(absNoPrevistaJSON.absnoprevistesData);
}

const mongoDB = process.env.MONGODB_URI;
mongoose
	.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function () {
		console.log("Sembrant: Absencies no previstes");
		seeder().then(function () {
			mongoose.connection.close();
		});
	})
	.catch((error) => {
		console.log("when the error happened", error);
	});
