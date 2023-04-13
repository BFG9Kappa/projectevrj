var AbsenciaPrevista = require("../models/absprevista");
const moment = require("moment");
const { body, validationResult } = require("express-validator");

class absprevistaController {

  static rules = [
    body("data_absprevista", "La data de l'absència prevista no pot estar buida.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("data_absprevista").custom((value, { req }) => {
      const data_actual = moment(req.body.data_actual, "DD-MM-YYYY");
      const data_absprevista = moment(value, "DD-MM-YYYY");
      if (data_absprevista.isBefore(data_actual)) {
        throw new Error(
          "La data de l'absencia prevista ha de ser posterior a la data actual"
        );
      }
      return true;
    }),
    body("motiu_abs")
    .trim()
    .custom((value, { req }) => {
      if (!value) {
        throw new Error("El motiu de l'absència no pot estar buit.");
      }
      if (value.length < 5) {
        throw new Error("El motiu ha de tindre com a mínim 5 caràcters.");
      }
      return true;
    })
    .escape()
  ];
  static async list(req, res, next) {
    try {
      var list_absprevistes = await AbsenciaPrevista.find();
      res.render("absprevistes/list", { list: list_absprevistes });
    } catch (error) {
      res.send(error);
    }
  }

  static genpdf_get(req, res, next) {
    res.render("absprevistes/decresp");
  }

  static genpdf_post(req, res, next) {
    res.redirect("/absprevistes");
  }

  static create_get(req, res, next) {
    var absenciaprevista = {
      data_absprevista: "",
      motiu_abs: "",
    };
    res.render("absprevistes/new", { absenciaprevista: absenciaprevista });
  }

  static create_post(req, res) {
    const errors = validationResult(req);
    //console.log(errors.array());
    // Tenim errors en les dades enviades

    if (!errors.isEmpty()) {
      var absenciaprevista = {
        data_absprevista: req.body.data_absprevista,
        motiu_abs: req.body.motiu_abs,
        _id: req.params.id,
      };
      res.render("absprevistes/new", {
        errors: errors.array(),
        absenciaprevista: absenciaprevista,
      });
    } else {
      AbsenciaPrevista.create(req.body, function (error, newAbsenciaPrevista) {
        if (error) {
          res.render("absprevistes/new", { error: error.message });
        } else {
          res.redirect("/absprevistes");
        }
      });
    }
  }

  static update_get(req, res, next) {
    AbsenciaPrevista.findById(req.params.id, function (err, absenciaprevista) {
      if (err) {
        return next(err);
      }
      if (absenciaprevista == null) {
        // No results.
        var err = new Error("Absència prevista no trobada");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("absprevistes/update", { absenciaprevista: absenciaprevista });
    });
  }

  static async update_post(req, res, next) {
    // Obtener la fecha de salida del formulario update
    const dataPrevista = req.body.data_absprevista;

    // Comprobar si la data prevista existeix
    if (!dataPrevista) {
        // Si la fecha de salida es anterior a la fecha actual, mostrar un mensaje de error
        return res.render("absprevistes/update", {
            error: "La data prevista no pot estar buida",
            absenciaprevista: req.body,
        });
    }
    // Obtener la fecha de salida del formulario update
    const motiu = req.body.motiu_abs;

    // Comprobar si la data de sortida existeix
    if (!motiu) {
        // Comprobar si el motiu de l'absencia prevista existeix
        return res.render("absprevistes/update", {
            error: "El motiu no pot estar buit",
            absenciaprevista: req.body,
        });
    }
    var absenciaprevista = new AbsenciaPrevista({
      data_absprevista: req.body.data_absprevista,
      motiu_abs: req.body.motiu_abs,
      _id: req.params.id,
    });

    try {
      await AbsenciaPrevista.findByIdAndUpdate(req.params.id, {
        data_absprevista: req.body.data_absprevista,
        motiu_abs: req.body.motiu_abs,
      });
      res.redirect('/absprevistes');
  } catch (err) {
      res.render("absprevistes/update", {
          error: err.message,
          absenciaprevista: req.body,
      });
  }


  }

  static async delete_get(req, res, next) {
    res.render("absprevistes/delete", { id: req.params.id });
  }

  static async delete_post(req, res, next) {
    AbsenciaPrevista.findByIdAndRemove(req.params.id, (error) => {
      if (error) {
        res.render("absprevistes", { error: error.message });
      } else {
        res.redirect("/absprevistes");
      }
    });
  }
}

module.exports = absprevistaController;
