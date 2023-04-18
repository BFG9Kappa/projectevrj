const AbsNoPrevista = require("../models/absnoprevista");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const user = require("../models/user");

class absnoprevistesController {
	static rules = [
		// validar hores absència, no poden estar buides i han de ser números enters d'1 a 8
		body("hores_ausencia")
		.bail()
		.notEmpty()
		.withMessage("Les hores d'absència no poden estar buides.")
		.bail()
		.isInt({min:1, max:8})
		.withMessage("Les hores d'absència han de ser d'1 a 8 hores.")
		.escape(),
		// validar motiu_abs, no pot estar buit i s'eliminen els espais en blanc a l'inici i al final del text
		body("motiu_abs")
		.notEmpty()
		.withMessage("El motiu de l'absència no pot estar buit."),
		// validar data_absnoprevista, no pot estar buida la data d'absència no prevista
		body("data_absnoprevista")
		.notEmpty()
		.withMessage("La data d'absència no pot estar buida.")
		.custom((value, { req }) => {
		  const data_actual = moment(req.body.data_actual, "DD-MM-YYYY");
		  const data_absnoprevista = moment(value, "DD-MM-YYYY");
		  if (data_absnoprevista.isBefore(data_actual)) {
			throw new Error(
			  "La data de l'absencia no prevista ha de ser igual o posterior a la data actual"
			);
		  }
		  return true;
		})
	];

	static async list(req, res, next) {
		try {
			const list_absnoprevistes = await AbsNoPrevista.find();
			if(req.session.data != undefined) {
				console.log("ey")
			}
			res.render("absnoprevistes/list", { list: list_absnoprevistes });
			} catch(error) {
				var err = new Error(error);
				err.status = 404;
				return next(err);
		}
	}

	static genpdf_get(req, res, next) {
		res.render("absnoprevistes/decresp");
	}

	static genpdf_post(req, res, next) {
		res.redirect("/absnoprevistes");
	}

	static create_get(req, res, next) {
		var absnoprevistes = {
      data_absnoprevista: new Date(),
			hores_ausencia: "",
			motiu_abs: "",
			document_justificatiu: "",
			user: "",
			_id: "",
		};
		res.render("absnoprevistes/new", { absnoprevistes: absnoprevistes });
	}

	static create_post(req, res) {
		const errors = validationResult(req);
		//console.log(errors.array());
		// Tenim errors en les dades enviades

		if (!errors.isEmpty()) {
			var absnoprevista = {
				data_absnoprevista: req.body.data_absnoprevista || new Date(),
				hores_ausencia: req.body.hores_ausencia,
				motiu_abs: req.body.motiu_abs,
				document_justificatiu: req.body.document_justificatiu,
				user: req.session.data.userId,
				_id: req.params.id, // Fa falta per sobreescriure el objecte.
			};
			res.render("absnoprevistes/new", {
				errors: errors.array(),
				absnoprevista: absnoprevista,
			});
		} else {
			req.body.user = req.session.data.userId;
			req.body.data_absnoprevista = new Date(req.body.data_absnoprevista);
			AbsNoPrevista.create(req.body, function (error, newAbsenciaNoPrevista) {
				if (error) {
					res.render("absnoprevistes/new", { error: error.message });
				} else {
					res.redirect("/absnoprevistes");
				}
			});
		}
	}

	static update_get(req, res, next) {
		AbsNoPrevista.findById(req.params.id, function (err, absnoprevista) {
			if (err) {
				return next(err);
			}
			if (absnoprevista == null) {
				// No results.
				var err = new Error("Absencia no prevista no trobada");
				err.status = 404;
				return next(err);
			}
			// Success.
			res.render("absnoprevistes/update", { absnoprevista: absnoprevista });
		});
	}

	static update_post(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			AbsNoPrevista.findById(req.params.id, function (error, absnoprevista) {
				if (error) {
					return next(error);
				}
				if (absnoprevista == null) {
					var error = new Error("Absencia no prevista no trobada");
					error.status = 404;
					return next(error);
				}
				res.render("absnoprevistes/update", {
					errors: errors.array(),
					absnoprevista: absnoprevista,
				});
			});
		} else {
			var absnoprevista = new AbsNoPrevista({
				data_absnoprevista: req.body.data_absnoprevista,
				hores_ausencia: req.body.hores_ausencia,
				motiu_abs: req.body.motiu_abs,
				document_justificatiu: req.body.document_justificatiu,
				_id: req.params.id,
			});
			AbsNoPrevista.findByIdAndUpdate(
				req.params.id,
				absnoprevista,
				{},
				function (error, absnoprevistaFound) {
					if (error) {
						res.render("absnoprevistes/update", {
							absnoprevista: absnoprevista,
							error: error.message,
						});
					}
					res.render("absnoprevistes/update", {
						absnoprevista: absnoprevista,
						message: "L'absència no prevista ha estat actualitzada",
					});
				}
			);
		}
	}

	static async delete_get(req, res, next) {
		res.render("absnoprevistes/delete", { id: req.params.id });
	}

	static async delete_post(req, res, next) {
		AbsNoPrevista.findByIdAndRemove(req.params.id, (error) => {
			if (error) {
				res.render("absnoprevistes", { error: error.message });
			} else {
				res.redirect("/absnoprevistes");
			}
		});
	}
}

module.exports = absnoprevistesController;
