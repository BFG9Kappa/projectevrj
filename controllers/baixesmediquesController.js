var BaixaMedica = require("../models/baixamedica");

//const { body, validationResult } = require("express-validator");

class baixesmediquesController {

	/*static rules = [
    // Validate and sanitize fields.
    body("comentari")
      .trim()
      .isLength({ max: 500})
      .withMessage('El comentari és molt llarg.')
      .escape()
      .custom(async function(value, {req}) {

          const baixamedica = await BaixaMedica.findOne({comentari:value});
          if (baixamedica) {
            if(req.params.id!==baixamedica.id ) {
              throw new Error('Aquesta baixa te el mateix comentari que un altre.');
            }
          }
          return true;
      })

  ];
*/
	static async list(req, res, next) {
		try {
			var list_baixesmediques = await BaixaMedica.find();
			res.render("baixesmediques/list", { list: list_baixesmediques });
		} catch (e) {
			res.send("Error!");
		}
	}

	static create_get(req, res, next) {
		var BaixaMedica = {
			"data_inicial_baixa" : "",
			"data_prevista_alta" : "",
			"comentari" : ""
		}

	res.render('baixesmediques/new',{BaixaMedica:BaixaMedica});
}

	static create_post(req, res) {
		// Recuperem els errors possibles de validació
		//const errors = validationResult(req);
		// console.log(req.body)
		BaixaMedica.create(req.body, function (error, newBaixamedica) {
			if (error) {
				//console.log(error)
				res.render("baixesmediques/new", { error: error.message });
			} else {
				res.redirect("/baixesmediques");
			}
		});
	}

	static update_get(req, res, next) {
		BaixaMedica.findById(req.params.id, function (err, baixamedica) {
			if (err) {
				return next(err);
			}
			if (baixamedica == null) {
				// No results.
				var err = new Error("Baixa medica no trobada");
				err.status = 404;
				return next(err);
			}
			// Success.
			res.render("baixesmediques/update", { baixamedica: baixamedica });
		});
	}

	static update_post(req, res, next) {
		//const errors = validationResult(req);
		var baixamedica = new BaixaMedica({
			baixamedica: req.body.baixamedica,
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
					message: "Baixa medica actualitzada",
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
				res.redirect("/baixesmediques");
			} else {
				res.redirect("/baixesmediques");
			}
		});
	}
}

module.exports = baixesmediquesController;
