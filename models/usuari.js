var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UsuariSchema = new Schema({
  name: { type: String, required: true },
  contraseña: { type: String, required: true },
});


// Export model.
module.exports = mongoose.model("Usuari", UsuariSchema);
