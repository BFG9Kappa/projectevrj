var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SortidaCurricularSchema = new Schema({
	data_sortida: { type: Date, required: true },
	lloc: { type: String },
	ruta: { type: String },
	objectius: { type: String },
	grups: { type: String },
	professors: { type: String },
	hora_inici: { type: String,
		enum: ['08:00', '09:00', '10:00', '11:00', '11:30', '12:30', '13:30', '15:00', '16:00', '17:00', '18:30', '19:30', '20:30'],
    required: false },
	hora_arribada: { type: String,
		enum: ['08:00', '09:00', '10:00', '11:00', '11:30', '12:30', '13:30', '15:00', '16:00', '17:00', '18:30', '19:30', '20:30'],
    required: false },
	estat: { type: String },
});

// Export model.
module.exports = mongoose.model("SortidaCurricular", SortidaCurricularSchema);
