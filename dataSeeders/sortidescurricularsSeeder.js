require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Sortida = require("../models/sortidacurricular");
const sortidaCurricularJSON = require("./sortidescurricularsData.json");

async function seeder() {
	await Sortida.collection.drop();
	await Sortida.insertMany(sortidaCurricularJSON.scurricularsData);
}

const mongoDB = process.env.MONGODB_URI;
mongoose
	.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function () {
		console.log("Sembrant: Sortides curriculars");
		seeder().then(function () {
			mongoose.connection.close();
		});
	})
	.catch((error) => {
		console.log("when the error happened", error);
	});
