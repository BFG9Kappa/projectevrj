var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BaixaMedicaSchema = new Schema({
  data_inicial_baixa: { type: Date,required: true,},
  data_prevista_alta: { type: Date,required: true,},
  comentari: { type: String, required: true,},
});

// Export model.
module.exports = mongoose.model("BaixaMedica", BaixaMedicaSchema);