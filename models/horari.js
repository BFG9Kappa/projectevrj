var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HorariSchema = new Schema({
    dia: { type: Number, required: true},
    hora: { type: Number, required: true},
    materia: { type: String, required: true},
    aula: { type: String, required: true},
    grup: { type: String, required: true},
    professor: { type: String, required: true},
});

// Export model.
module.exports = mongoose.model("Horari", HorariSchema);