var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HorariSchema = new Schema({
    horainici: { type: Number, required: true },
    horafi: { type: Number, required: true },
    nomassignatura: { type: String, required: true },
    aula: { type: Number, required: true },
    codiprofessor: { type: Number, required: true },
});

module.exports = mongoose.model("Horari", HorariSchema);