require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Horari = require("../models/horari");
const csv = require("csvtojson");

async function seeder() {
	await Horari.collection.drop();
	const jsonObj = await csv().fromFile("./horarisData.csv");
	await Horari.insertMany(jsonObj);
}

const mongoDB = process.env.MONGODB_URI;
mongoose
	.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function () {
		console.log("Sembrant: Horaris");
		seeder().then(function () {
			mongoose.connection.close();
		});
	})
	.catch((error) => {
		console.log("when the error happened", error);
	});
