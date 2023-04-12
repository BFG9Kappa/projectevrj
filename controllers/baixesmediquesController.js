var BaixaMedica = require("../models/baixamedica");
var User = require("../models/user");

const moment = require("moment");
const { body, validationResult } = require("express-validator");

class baixesmediquesController {
	static rules = [
		body("data_inicial_baixa", "La data inicial de baixa no pot estar buida.")
			.trim()
			.isLength({ min: 1 })
			.escape(),
		body("data_prevista_alta", "La data prevista d'alta no pot estar buida.")
			.trim()
			.isLength({ min: 1 })
			.escape(),
		body("comentari", "El comentari ha de tindre com a mínim 5 caràcters.")
			.trim()
			.isLength({ min: 5 }),
		//.escape()
		body("data_prevista_alta").custom((value, { req }) => {
			const data_inicial_baixa = moment(
				req.body.data_inicial_baixa,
				"DD-MM-YYYY"
			);
			const data_prevista_alta = moment(value, "DD-MM-YYYY");
			if (data_prevista_alta.isBefore(data_inicial_baixa)) {
				throw new Error(
					"La data prevista alta ha de ser posterior a la data inicial de la baixa"
				);
			}
			return true;
		}),
	];

	static async list(req, res, next) {
		try {
			//let userList = await User.find({});
			//console.log(userList);
			const user = await User.findOne({ email: req.params.id });
			//console.log(user);

			//const list_baixesmediques = await BaixaMedica.find();

			const list_baixesmediques = await BaixaMedica.find({});
			//console.log(list_baixesmediques);

			/*
			var book = await TechnicalBook.findById(req.params.id,"title author")
					.populate('genre')
					.populate('publisher') ;
			*/
			//res.render('baixesmediques/list',{ instances:instancesList,userList:userList })
			res.render("baixesmediques/list", { list: list_baixesmediques });
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
				_id: req.params.id,
			};
			res.render("baixesmediques/new", {
				errors: errors.array(),
				baixamedica: baixamedica,
			});
		} else {
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
		var baixamedica = new BaixaMedica({
			data_inicial_baixa: req.body.data_inicial_baixa,
			data_prevista_alta: req.body.data_prevista_alta,
			comentari: req.body.comentari,
			_id: req.params.id,
		});

		BaixaMedica.findByIdAndUpdate(
			req.params.id,
			baixamedica,
			{},

			function (err, baixamedicaFound) {
				if (err) {
					res.render("baixesmediques/update", {
						baixamedica: baixamedica,
						error: err.message,
					});
				}
				res.render("baixesmediques/update", {
					baixamedica: baixamedica,
					message: "Baixa mèdica actualitzada",
				});
			}
		);
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
