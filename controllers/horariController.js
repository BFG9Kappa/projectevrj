var Horari = require("../models/horari");

class HorariController {

  static list(req, res, next) {
    Horari.find()
      .exec(function (err, list_horari) {
        if (err) {
          return next(err);
        }
        res.render('horaris/list', { list: list_horari })
      });
  }

  static create_get(req, res, next) {
    res.render('horaris/new');
  }

  static create_post(req, res) {
    Horari.create(req.body, function (error, newHorari) {
      if (error) {
        res.render('horaris/new', { error: error.message })
      } else {
        res.redirect('/horaris')
      }
    })
  }

  static update_get(req, res, next) {
    Horari.findById(req.params.id, function (err, horari) {
      if (err) {
        return next(err);
      }
      if (horari == null) { // Sense resultats.
        var err = new Error("Horari not found");
        err.status = 404;
        return next(err);
      } // Correcte.
      res.render("horaris/update", { horari: horari });
    });
  }

  static update_post(req, res, next) {
    var horari = new Horari({
      dia: req.body.dia,
      hora: req.body.hora,
      materia: req.body.materia,
      aula: req.body.aula,
      grup: req.body.grup,
      professor: req.body.professor,
      _id: req.params.id,  // Fa falta per sobreescriure el objecte.
    });
    Horari.findByIdAndUpdate(
      req.params.id,
      horari,
      { runValidators: true }, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
      function (err, horariFound) {
        if (err) {
          res.render("horaris/update", { horari: horari, error: err.message });
        }
        res.render("horaris/update", { horari: horari, message: 'Horari Updated' });
      }
    );
  }

  static async delete_get(req, res, next) {
    res.render('horaris/delete', { id: req.params.id })
  }

  static async delete_post(req, res, next) {
    Horari.findByIdAndRemove(req.params.id, function (error) {
      if (error) {
        
        res.redirect('/horaris')
      } else {
        res.redirect('/horaris')
      }
    })
  }

}

module.exports = HorariController;