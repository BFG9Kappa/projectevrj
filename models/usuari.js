var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UsuariSchema = new Schema({
    nom: { type: String, required: true },
    cognoms: { type: String },
    dni: { type: String },
    carrec: {
        type: String,
        enum: ['Director', 'Conserge', 'Administrador', 'Professor'],
        default: 'Professor'
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Export model.
module.exports = mongoose.model("Usuari", UsuariSchema);
