var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AbsPrevistaSchema = new Schema({
  data_absprevista: { type: Date, required: true },
  motiu_abs: { type: String },
});

// Export model.
module.exports = mongoose.model("AbsPrevista", AbsPrevistaSchema);