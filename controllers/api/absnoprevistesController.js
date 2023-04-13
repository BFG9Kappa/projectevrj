var AbsNoPrevista = require("../models/absnoprevista");
const { body, validationResult } = require("express-validator");

class absnoprevistesController {
	static rules = [
		// validar hores absència, no poden estar buides i han de ser números enters d'1 a 8
		body("hores_ausencia")
			.notEmpty()
			.withMessage("Les hores d'absència són obligatòries.")
			.isInt({min:1, max:8})
			.withMessage("Les hores d'absència han de ser d'1 a 8.")
			.escape(),

		// validar motiu_abs, no pot estar buit i s'eliminen els espais en blanc a l'inici i al final del text
		body("motiu_abs")
			.notEmpty()
			.withMessage("El motiu de l'absència és obligatori.")
			.trim()
			.isLength({min: 1})
			.withMessage("El motiu de l'absència ha de tenir almenys 1 caràcter."),

		// validar data_absnoprevista, no pot estar buida la data d'absència no prevista
		body("data_absnoprevista")
			.notEmpty()
			.withMessage("La data d'absència és obligatòria."),

	];

	// Recuperar totes les Absències no previstes
	static async all(req, res, next) {

		try {
			const result = await AbsNoPrevista.find();
			res.status(200).json(result)
		}
		catch(error) {
			res.status(402).json({errors: [{msg:"Hi ha hagut un problema al recuperar les absències no previstes."}]})
		}
	}

	// Recuperar les Absències no previstes en pàgines

	static async create(req, res, next) {
   
		const errors = validationResult(req);  
	   
	
		if (!errors.isEmpty()) {
			res.status(402).json({errors:errors.array()}) 
		}
		else {    
			var absNoPrevista = {
				data_absnoprevista: req.body.data_absnoprevista || new Date(),
				hores_ausencia: req.body.hores_ausencia,
				motiu_abs: req.body.motiu_abs,
				document_justificatiu: req.body.document_justificatiu,
				_id: req.params.id, // Fa falta per sobreescriure el objecte.
			};
	
			try {
			  const NewAbsnoprevista = await AbsNoPrevista.create(req.body)
			  res.status(200).json(NewAbsnoprevista)
			} catch(error) {
			  res.status(402).json({errors: [{msg:"Hi ha hagut un problema al recuperar les absències no previstes."}]})          
			}        
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
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			AbsNoPrevista.findById(req.params.id, function (error, absnoprevista) {
				if (error) {
					return next(error);
				}
				if (absnoprevista == null) {
					var error = new Error("Absencia no prevista not found");
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
						message: "La absència no prevista ha sigut actualitzada",
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
