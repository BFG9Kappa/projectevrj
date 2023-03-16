require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Usuaris = require("../models/user");
const usuarisJSON = require("./usuarisData.json");
const bcrypt = require("bcryptjs");

async function seeder() {
	await Usuaris.collection.drop();
	for(var i =0; i<  usuarisJSON.usuarisData.length; i ++) {
		usuarisJSON.usuarisData[i].password =  await bcrypt.hash(usuarisJSON.usuarisData[i].password,12);
  }
	await Usuaris.insertMany(usuarisJSON.usuarisData);
}

const mongoDB = process.env.MONGODB_URI;
mongoose
	.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function () {
		console.log("Sembrant: Usuaris");
		seeder().then(function () {
			mongoose.connection.close();
		});
	})
	.catch((error) => {
		console.log("when the error happened", error);
	});
