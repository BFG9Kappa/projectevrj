var AbsenciaPrevista = require("../models/absprevista");
var User = require("../models/user");
const moment = require("moment");
const { body, validationResult } = require("express-validator");

class absprevistaController {
  static rules = [
    body("data_absprevista")
		.notEmpty()
		.withMessage("La data d'absència no pot estar buida.")
		.custom((value, { req }) => {
		  const data_actual = moment(req.body.data_actual, "DD-MM-YYYY");
		  const data_absprevista = moment(value, "DD-MM-YYYY");
		  if (data_absprevista.isBefore(data_actual)) {
			throw new Error(
			  "La data de l'absencia prevista ha de ser igual o posterior a la data actual"
			);
		  }
		  return true;
		}),
    body("motiu_abs")
		.notEmpty()
		.withMessage("El motiu de l'absència no pot estar buit."),
  ];
  static async list(req, res, next) {
    try {
			// tamo testing
			var users = await User.find();
      for (let index = 0; index < users.length; index++) {

      }
			//
			var list_absprevistes;
			if (req.session.data != undefined && req.session.data.role.includes("administrador")) {
				list_absprevistes = await AbsenciaPrevista.find();
				res.render("absprevistes/list", { list: list_absprevistes });
			} else if (req.session.data != undefined) {
				list_absprevistes = await AbsenciaPrevista.find({ user: req.session.data.userId });
				res.render("absprevistes/list", { list: list_absprevistes });
			} else {
				res.redirect("/auth/login");
			}
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
			user: "",
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
				user: "",
        _id: req.params.id,
      };
      res.render("absprevistes/new", {
        errors: errors.array(),
        absenciaprevista: absenciaprevista,
      });
    } else {
			req.body.user = req.session.data.userId;
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

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			AbsenciaPrevista.findById(req.params.id, function (error, absenciaprevista) {
				if (error) {
					return next(error);
				}
				if (absenciaprevista == null) {
					var error = new Error("Absencia prevista no trobada");
					error.status = 404;
					return next(error);
				}
				res.render("absprevistes/update", {
					errors: errors.array(),
					absenciaprevista: absenciaprevista,
				});
			});
		} else {
			var absenciaprevista = {
        data_absprevista: req.body.data_absprevista,
        motiu_abs: req.body.motiu_abs,
        _id: req.params.id,
      };
			AbsenciaPrevista.findByIdAndUpdate(
				req.params.id,
				absenciaprevista,
				{},
				function (error, absenciaprevistaFound) {
					if (error) {
						res.render("absprevistes/update", {
							absenciaprevista: absenciaprevista,
							error: error.message,
						});
					}
					res.render("absprevistes/update", {
					absenciaprevista: absenciaprevista,
					message: "L'absència prevista ha sigut actualitzada",
					});
				}
			);
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
