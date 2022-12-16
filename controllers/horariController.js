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
      if (horari == null) {
        // No results.
        var err = new Error("Horari not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("horaris/update", { horari: horari });
    });
  }

  static update_post(req, res, next) {
    var horari = new Horari({
      horainici: req.body.horainici,
      horafi: req.body.horafi,
      nomassignatura: req.body.nomassignatura,
      aula: req.body.aula,
      codiprofessor: req.body.codiprofessor,
      _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
    });
    Horari.findByIdAndUpdate(
      req.params.id,
      horari,
      { runValidators: true }, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
      function (err, horariFound) {
        if (err) {
          //return next(err);
          res.render("horaris/update", { horari: horari, error: err.message });
        }
        //res.redirect('/genres/update/'+ genreFound._id);
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