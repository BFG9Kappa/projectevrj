var AbsNoPrevista = require("../../models/absnoprevista");
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

  // Recuperar els les absències previstes en pàgines
	static async list(req, res, next) {

		try {
			const result = await AbsNoPrevista.find();
			res.status(200).json(result)
		}
		catch(error) {
			res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre les absències no previstes."}]})
		}
	}

}

module.exports = absnoprevistesController;
