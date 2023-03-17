var AbsNoPrevista = require("../models/absnoprevista");
const { body, validationResult } = require("express-validator");

class absnoprevistesController {
	static rules = [

		body("hores_ausencia", "Les hores d'ausencia no pot estar buit.")
			.trim()
			.isLength({ min: 1 })
			.escape(),

			body("motiu_abs", "El motiu de l'absència no pot estar buit.")
			.trim()
			.isLength({ min: 1 })
			//.escape()
			,
	];

	static async list(req, res, next) {
		try {
			var list_absnoprevistes = await AbsNoPrevista.find();
			res.render("absnoprevistes/list", { list: list_absnoprevistes });
		} catch (e) {
			res.send("Error!");
		}
	}

	static create_get(req, res, next) {
		var absnoprevistes = {
			data_absnoprevista: "",
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
				data_absnoprevista: req.body.data_absnoprevista,
				hores_ausencia: req.body.hores_ausencia,
				motiu_abs: req.body.motiu_abs,
				document_justificatiu: req.params.document_justificatiu,
				_id: req.params.id, // Fa falta per sobreescriure el objecte.
			};
			res.render("absnoprevistes/new", {
				errors: errors.array(),
				absnoprevista: absnoprevista,
			});
		} else {
			AbsNoPrevista.create(req.body, function (error, newAbsNoPrevista) {
				if (error) {
					//console.log(error)
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
				res.redirect("/absnoprevistes");
			} else {
				res.redirect("/absnoprevistes");
			}
		});
	}
}

module.exports = absnoprevistesController;
