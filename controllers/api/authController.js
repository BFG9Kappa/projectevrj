var User = require("../../models/user");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

class authController {
	static rules = [
		body("email").trim().notEmpty().withMessage("El correu electrònic no pot estar buit."),
		body("password")
			.trim()
			.notEmpty()
			.withMessage("La contrasenya no pot estar buida."),
	];

	static rules = [
		body("fullname").not().isEmpty().withMessage("El nom no pot estar buit."),
		body("email", "El correu electrònic no pot estar buit.")
			.not()
			.isEmpty()
			.withMessage("El correu electrònic no pot estar buit.")
			.isEmail()
			.withMessage("El format del correu electrònic no es correcte.")
			.custom(async function (value, { req }) {
				const user = await User.findOne({ email: value });
				if (user) {
					throw new Error("Aquest correu electrònic ja està en us.");
				}
				return true;
			})
			.withMessage("Aquest correu electrònic ja està en us."),
		body("password")
			.isLength({ min: 1 })
			.withMessage("La contrasenya no pot estar buida.")
			.custom((val, { req, loc, path }) => {
				if (val !== req.body.confirm_password) {
					throw new Error("Les contrasenyes no coincideixen.");
				} else {
					return true;
				}
			}),
	];

	// Recuperar els usuaris
	static async all(req, res, next) {

		try {
			const result = await User.find().select("-password");
		  res.status(200).json(result)
		}
		catch(error) {
		  res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre el usuaris."}]})
		}
	}

  // Recuperar els usuaris en pàgines
	static async list(req, res, next) {
		// Configurar la paginació
		const options = {
			page: req.query.page || 1,  // Número pàgina
			limit: 5,       // Número registres per pàgina
			sort: { _id: -1 },   // Ordenats per id: el més nou el primer
		};

	try {
		const result = await User.paginate({}, options).select("-password");
		res.status(200).json(result)
	}
	catch(error) {
		res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre els usuaris."}]})
	}
}

static async delete(req, res, next) {

	try {
		const usuari = await User.findByIdAndRemove(req.params.id)
		res.status(200).json(usuari)
	}
	catch {
		res.status(402).json({errors: [{msg:"Hi ha hagut algun problema eliminant el ususari."}]})
	}
	}


}

module.exports = authController;
