var AbsenciaPrevista = require("../../models/absprevista");
const { body, validationResult } = require("express-validator");

class absprevistaController {

	static rules = [
		body("data_absprevista", "La data de l'absència prevista no pot estar buida.")
			.trim()
			.isLength({ min: 1 })
			.escape(),

		body("motiu_abs", "El motiu de l'absència no pot estar buit.")
			.trim()
			.isLength({ min: 1 })
			//.escape()
			,

			body("motiu_abs", "El motiu ha de tindre com a mínim 5 caràcters.")
      .trim()
      .isLength({ min: 5})
      //.escape()
			,
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
		var AbsenciaPrevista = {
			data_absprevista: "",
			motiu_abs: "",
		};
		res.render("absprevistes/new", { AbsenciaPrevista: AbsenciaPrevista });
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

	static update_post(req, res, next) {
		var absenciaprevista = new AbsenciaPrevista({
			data_absprevista: req.body.data_absprevista,
			motiu_abs: req.body.motiu_abs,
			_id: req.params.id,
		});

		AbsenciaPrevista.findByIdAndUpdate(
			req.params.id,
			absenciaprevista,
			{ runValidators: true },
			function (err, theAbsenciaPrevista) {
				if (err) {
					res.render("absprevistes/update", {
						absenciaprevista: absenciaprevista,
						error: err.message,
					});
				}
				res.render("absprevistes/update", {
					absenciaprevista: absenciaprevista,
					message: "Absència prevista actualitzada",
				});
			}
		);
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
