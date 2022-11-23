var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SortidaCurricularSchema = new Schema({
  data_sortida: { type: Date, required: true },
  lloc: { type: String },
  ruta: { type: String },
  objectius: { type: String },
  grups: { type: String },
  professors: { type: String },
  hora_inici: { type: Number },
  hora_arribada: { type: Number },
  estat: { type: String },
});

// Export model.
module.exports = mongoose.model("SortidaCurricular", SortidaCurricularSchema);