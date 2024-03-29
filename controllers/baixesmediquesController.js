const BaixaMedica = require("../models/baixamedica");
const User = require("../models/user");
const isAuth = require('../middlewares/authenticate');

const moment = require("moment");
const { body, validationResult } = require("express-validator");

class baixesmediquesController {
	static rules = [
		body("data_inicial_baixa")
		.notEmpty()
		.withMessage("La data inicial no pot estar buida.")
		.custom((value, { req }) => {
		  const data_actual = moment(req.body.data_actual, "DD-MM-YYYY");
		  const data_inicial_baixa = moment(value, "DD-MM-YYYY");
		  if (data_inicial_baixa.isBefore(data_actual)) {
			throw new Error(
			  "La data inicial de la baixa ha de ser igual o posterior a la data actual"
			);
		  }
		  return true;
		}),
		body("data_prevista_alta")
		.notEmpty()
		.withMessage("La data prevista d'alta no pot estar buida.")
		.custom((value, { req }) => {
		  const data_inicial_baixa = moment(req.body.data_inicial_baixa);
		  const data_prevista_alta = moment(value);
		  if (data_prevista_alta.isBefore(data_inicial_baixa, "day")) {
			throw new Error("La data prevista d'alta ha de ser posterior o igual al dia i mes de la data inicial de la baixa.");
		  } else if (!data_prevista_alta.isSameOrAfter(data_inicial_baixa, "month")) {
			throw new Error("La data prevista d'alta ha de ser posterior o igual al mes de la data inicial de la baixa.");
		  }
		  return true;
		}),
		body("comentari")
		.notEmpty()
		.withMessage("El comentari no pot estar buit."),
	];

	static async list(req, res, next) {
		try {
			var list_baixesmediques;
			if (req.session.data != undefined && req.session.data.role.includes("administrador")) {
				list_baixesmediques = await BaixaMedica.find().populate("user");
				res.render("baixesmediques/list", { list: list_baixesmediques });
			} else if (req.session.data != undefined) {
				list_baixesmediques = await BaixaMedica.find({ user: req.session.data.userId });
				res.render("baixesmediques/list", { list: list_baixesmediques });
			} else {
				res.redirect("/auth/login");
			}
		} catch(error) {
			var err = new Error(error);
			err.status = 404;
			return next(err);
		}
	}

	static create_get(req, res, next) {
		var baixamedica = {
			data_inicial_baixa: "",
			data_prevista_alta: "",
			comentari: "",
			user: "",
			_id: "",
		};
		res.render("baixesmediques/new", { baixamedica: baixamedica });
	}

	static create_post(req, res) {
		const errors = validationResult(req);
		//console.log(errors.array());
		// Tenim errors en les dades enviades
		// El formulario es válido, se puede procesar la información
		// ...

		if (!errors.isEmpty()) {
			var baixamedica = {
				data_inicial_baixa: req.body.data_inicial_baixa,
				data_prevista_alta: req.body.data_prevista_alta,
				comentari: req.body.comentari,
				user: req.session.data.userId,
				_id: req.params.id,
			};
			res.render("baixesmediques/new", {
				errors: errors.array(),
				baixamedica: baixamedica,
			});
		} else {
			req.body.user = req.session.data.userId
			BaixaMedica.create(req.body, function (error, newBaixamedica) {
				if (error) {
					res.render("baixesmediques/new", { error: error.message });
				} else {
					res.redirect("/baixesmediques");
				}
			});
		}
	}

	static update_get(req, res, next) {
		BaixaMedica.findById(req.params.id, function (err, baixamedica) {
			if (err) {
				return next(err);
			}
			if (baixamedica == null || baixamedica == "") {
				// No results.
				var err = new Error("BaixaMedica no trobada");
				err.status = 404;
				return next(err);
			}
			// Success.
			res.render("baixesmediques/update", { baixamedica: baixamedica });
		});
	}

	static update_post(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			BaixaMedica.findById(req.params.id, function (error, baixamedica) {
				if (error) {
					return next(error);
				}
				if (baixamedica == null) {
					var error = new Error("Baixa mèdica no trobada");
					error.status = 404;
					return next(error);
				}
				res.render("baixesmediques/update", {
					errors: errors.array(),
					baixamedica: baixamedica,
				});
			});
		} else {
			var baixamedica = {
				data_inicial_baixa: req.body.data_inicial_baixa,
				data_prevista_alta: req.body.data_prevista_alta,
				comentari: req.body.comentari,
				_id: req.params.id,
			};
			BaixaMedica.findByIdAndUpdate(
				req.params.id,
				baixamedica,
				{},
				function (error, baixamedicaFound) {
					if (error) {
						res.render("baixesmediques/update", {
							baixamedica: baixamedica,
							error: error.message,
						});
					}
					res.render("baixesmediques/update", {
						baixamedica: baixamedica,
						message: "La baixa mèdica ha estat actualitzada",
					});
				}
			);
		}
	}

	static async delete_get(req, res, next) {
		res.render("baixesmediques/delete", { id: req.params.id });
	}

	static async delete_post(req, res, next) {
		BaixaMedica.findByIdAndRemove(req.params.id, (error) => {
			if (error) {
				res.render("baixesmediques", { error: error.message });
			} else {
				res.redirect("/baixesmediques");
			}
		});
	}
}

module.exports = baixesmediquesController;
