var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var AbsPrevistaSchema = new Schema({
	data_absprevista: { type: Date, required: true },
	motiu_abs: { type: String, required: true },
	document_justificatiu: { type: String, required: false },
	user: { type: Schema.ObjectId, ref: "User", required: false },
});

AbsPrevistaSchema.plugin(mongoosePaginate);
// Export model.
module.exports = mongoose.model("AbsPrevista", AbsPrevistaSchema);
