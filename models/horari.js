var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HorariSchema = new Schema({
	dia: {
		type: Number,
		required: true,
	},
	hora: {
		type: Number,
		required: true,
	},
	materia: {
		type: String,
		required: true,
	},
	aula: {
		type: String,
		required: true,
	},
	grup: {
		type: String,
		required: true,
	},
	professor: {
		type: Schema.ObjectId, ref: "User",
		required: false,
	},
});

module.exports = mongoose.model("Horari", HorariSchema);
