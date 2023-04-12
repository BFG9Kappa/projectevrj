var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BaixaMedicaSchema = new Schema({
	data_inicial_baixa: { type: Date, required: true },
	data_prevista_alta: { type: Date, required: true },
	comentari: { type: String, required: false },
	document_justificatiu_medic: { type: String, required: false },
	user: { type: Schema.ObjectId, ref: "User", required: false },
});

// Export model.
module.exports = mongoose.model("BaixaMedica", BaixaMedicaSchema);
