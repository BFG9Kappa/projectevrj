var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var SortidaCurricularSchema = new Schema({
	data_actual: { type: Date, required: false },
	data_sortida: { type: Date, required: true },
	email: { type: String, required: false },
	lloc: { type: String },
	ruta: { type: String },
	objectius: { type: String },
	grups: { type: String },
	professor: { type: Schema.ObjectId, ref: "User", required: false },
	hora_inici: { type: String,
		enum: ['08:00', '09:00', '10:00', '11:00', '11:30', '12:30', '13:30', '15:00', '16:00', '17:00', '18:30', '19:30', '20:30'],
    required: false },
	hora_arribada: { type: String,
		enum: ['08:00', '09:00', '10:00', '11:00', '11:30', '12:30', '13:30', '15:00', '16:00', '17:00', '18:30', '19:30', '20:30'],
    required: false },
	estat: { type: String },
});

SortidaCurricularSchema.plugin(mongoosePaginate);
// Export model.
module.exports = mongoose.model("SortidaCurricular", SortidaCurricularSchema);
