var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


var Schema = mongoose.Schema;

var AbsNoPrevistaSchema = new Schema({
	data_absnoprevista: { type: Date, required: false },
	hora_inici_absnoprevista: { type: String,
		enum: ['08:00', '09:00', '10:00', '11:00', '11:30', '12:30', '13:30', '14:30', '15:00', '16:00', '17:00', '18:30', '19:30', '20:30'],
    required: false },
	hora_final_absnoprevista: { type: String,
		enum: ['08:00', '09:00', '10:00', '11:00', '11:30', '12:30', '13:30', '14:30', '15:00', '16:00', '17:00', '18:30', '19:30', '20:30'],
    required: false },
	motiu_abs: { type: String, required: true },
	document_justificatiu: { type: String, required: false },
	created_at: {type: Date, default: Date.now, // Se asigna la fecha actual por defecto.
  },
	user: { type: Schema.ObjectId, ref: "User", required: false },
});

AbsNoPrevistaSchema.plugin(mongoosePaginate);
// Export model.
module.exports = mongoose.model("AbsNoPrevista", AbsNoPrevistaSchema);
