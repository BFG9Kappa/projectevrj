var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


var Schema = mongoose.Schema;

var AbsNoPrevistaSchema = new Schema({
	data_absnoprevista: { type: Date, required: false },
	hores_ausencia: { type: Number, required: true },
	motiu_abs: { type: String, required: true },
	document_justificatiu: { type: String, required: false },
	user: { type: Schema.ObjectId, ref: "User", required: false },
});

AbsNoPrevistaSchema.plugin(mongoosePaginate);
// Export model.
module.exports = mongoose.model("AbsNoPrevista", AbsNoPrevistaSchema);
