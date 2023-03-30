var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AbsNoPrevistaSchema = new Schema({
	data_absnoprevista: { type: Date, required: false },
	hores_ausencia: { type: Number, required: true },
	motiu_abs: { type: String, required: true },
	document_justificatiu: { type: Buffer, required: false },
	user: { type: Schema.ObjectId, ref: "User" },
});

// Export model.
module.exports = mongoose.model("AbsNoPrevista", AbsNoPrevistaSchema);
