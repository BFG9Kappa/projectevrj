var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AbsNoPrevistaSchema = new Schema({
  data_absnoprevista: { type: Date, required: true },
  horari_profe: { type: Date, required: true },
  motiu_abs: { type: String },

});

// Export model.
module.exports = mongoose.model("AbsNoPrevista", AbsNoPrevistaSchema);