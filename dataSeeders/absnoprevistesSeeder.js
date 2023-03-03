require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const AbsPrevista = require("../models/absnoprevista");
const absPrevistaJSON = require("./absnoprevistesData.json");

async function seeder() {
	await AbsPrevista.collection.drop();
	await AbsPrevista.insertMany(absPrevistaJSON.absnoprevistesData);
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
