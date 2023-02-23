var AbsNoPrevista = require("../models/absnoprevista");

class absnoprevistesController {
	static list(req, res, next) {
		AbsNoPrevista.find().exec(function (err, list_absnoprevista) {
			if (err) {
				return next(err);
			}
			res.render("absnoprevistes/list", { list: list_absnoprevista });
		});
	}

	static create_get(req, res, next) {
		res.render("absnoprevistes/new");
	}

	static create_post(req, res) {
		// console.log(req.body)
		AbsNoPrevista.create(req.body, function (error, newAbsNoPrevista) {
			if (error) {
				// console.log(error)
				res.render("absnoprevistes/new", { error: error.message });
			} else {
				res.redirect("/absnoprevistes");
			}
		});
	}

	static update_get(req, res, next) {
		AbsNoPrevista.findById(req.params.id, function (err, absnoprevista) {
			if (err) {
				return next(err);
			}
			if (absnoprevista == null) {
				// No results.
				var err = new Error("Absència no prevista no trobada");
				err.status = 404;
				return next(err);
			} // Success.
			res.render("absnoprevistes/update", {
				absnoprevista: absnoprevista,
			});
		});
	}

	static update_post(req, res, next) {
		var absnoprevista = new AbsNoPrevista({
			data_absnoprevista: req.body.data_absnoprevista,
			horari_profe: req.body.horari_profe,
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
					message: "Absència no prevista actualitzada",
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
