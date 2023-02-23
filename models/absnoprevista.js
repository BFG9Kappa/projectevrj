var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AbsNoPrevistaSchema = new Schema({

  data_absnoprevista: { type: Date },
  horari_profe: { type: Date},
  hores_ausencia: { type: Number},
  motiu_abs: { type: String},
  document_justificatiu: { type: String },

});

// Export model.
module.exports = mongoose.model("AbsNoPrevista", AbsNoPrevistaSchema);