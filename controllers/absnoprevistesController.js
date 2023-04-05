var AbsNoPrevista = require("../models/absnoprevista");
const { body, validationResult } = require("express-validator");

const fs = require('fs');
const path = require('path');
const rootDir = path.dirname(require.main.filename);

class absnoprevistesController {
	static rules = [
		// validar hores_ausencia, no pueden estar buides y han de ser numeros enters de 1 a 8
		body("hores_ausencia")
			.notEmpty()
			.withMessage("Les hores d'absència són obligatòries.")
			.isInt({min:1, max:8})
			.withMessage("Les hores d'absència han de ser d'1 a 8.")
			.escape(),

		// validar motiu_abs, no puede estar vacío y se eliminan los espacios en blanco al inicio y al final del texto
		body("motiu_abs")
			.notEmpty()
			.withMessage("El motiu de l'absència és obligatori.")
			.trim()
			.isLength({min: 1})
			.withMessage("El motiu de l'absència ha de tenir almenys 1 caràcter.")

	];

	static async list(req, res, next) {
		try {
			var list_absnoprevistes = await AbsNoPrevista.find();
			res.render("absnoprevistes/list", { list: list_absnoprevistes });
		} catch (error) {
			res.send(error);
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
			_id: "",
		};
		res.render("absnoprevistes/new", { absnoprevistes: absnoprevistes });
	}

	static create_post(req, res) {
		const errors = validationResult(req);
		console.log(errors.array());
		// Tenim errors en les dades enviades

		if (!errors.isEmpty()) {
			var absnoprevista = {
				data_absnoprevista: req.body.data_absnoprevista || new Date(),
				hores_ausencia: req.body.hores_ausencia,
				motiu_abs: req.body.motiu_abs,
				document_justificatiu: req.body.document_justificatiu,
				_id: req.params.id, // Fa falta per sobreescriure el objecte.
			};
			res.render("absnoprevistes/new", {
				errors: errors.array(),
				absnoprevista: absnoprevista,
			});
		} else {
			req.body.data_absnoprevista = new Date(req.body.data_absnoprevista);
			AbsNoPrevista.create({
				data_absnoprevista: req.body.data_absnoprevista.toISOString(),
				hores_ausencia: req.body.hores_ausencia,
				motiu_abs: req.body.motiu_abs,
				document_justificatiu: req.body.document_justificatiu,
				_id: req.params.id, // Fa falta per sobreescriure el objecte.
			}, function (error, newAbsNoPrevista) {
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
				var err = new Error("Absencia no prevista not found");
				err.status = 404;
				return next(err);
			}
			// Success.
			res.render("absnoprevistes/update", { absnoprevista: absnoprevista });
		});
	}

	static update_post(req, res, next) {
		var absnoprevista = new AbsNoPrevista({
			data_absnoprevista: req.body.data_absnoprevista,
			hores_ausencia: req.body.hores_ausencia,
			motiu_abs: req.body.motiu_abs,
			document_justificatiu: req.params.document_justificatiu,
			_id: req.params.id, // Fa falta per sobreescriure el objecte.
		});

		AbsNoPrevista.findByIdAndUpdate(
			req.params.id,
			absnoprevista,
			{},
			function (err, absnoprevistaFound) {
				if (err) {
					res.render("absnoprevistes/update", {
						absnoprevista: absnoprevista,
						error: err.message,
					});
				}
				res.render("absnoprevistes/update", {
					absnoprevista: absnoprevista,
					message: "Absencia no prevista Updated",
				});
			}
		);
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
