var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HorariSchema = new Schema({
    dia: { type: Number, required: true},
    hora: { type: Number, required: true},
    cmateria: { type: Number, required: true},
    codiAula: { type: Number, required: true},
    
    /*
    horainici: { type: Number, required: true },
    horafi: { type: Number, required: true },
    nomassignatura: { type: String, required: true },
    aula: { type: Number, required: true },
    codiprofessor: { type: Number, required: true },
    */
});

// Export model.
module.exports = mongoose.model("Horari", HorariSchema);