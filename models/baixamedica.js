var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BaixaMedicaSchema = new Schema({
  data_inicial_baixa: { type: Date },
  data_prevista_alta: { type: Date },
  comentari: { type: String },
});

// Export model.
module.exports = mongoose.model("BaixaMedica", BaixaMedicaSchema);