var User = require("../../models/user");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

class authController {
	static loginRules = [
		body("email").trim().notEmpty().withMessage("El correu electrònic no pot estar buit."),
		body("password")
			.trim()
			.notEmpty()
			.withMessage("La contrasenya no pot estar buida."),
	];

	static registerRules = [
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

	static login_get(req, res, next) {
		res.render("users/login");
	}

	static login_post(req, res, next) {
		// Recuperem els errors possibles de validació
		const errors = validationResult(req);
		// Si tenim errors en les dades enviades
		if (!errors.isEmpty()) {
			var message = "Els camps de correu electrònic i de contrasenya son obligatoris.";
			res.render("users/login", { message: message });
		} else {
			var email = req.body.email;
			var password = req.body.password;
			User.findOne({ email: email }).exec(function (err, user) {
				if (err) {
					res.send(err);
				}
				if (!user) {
					var message = "Algo ha sortit malament."; //Usuari no existeix
					res.render("users/login", { message: message });
				} else {
					if (bcrypt.compareSync(password, user.password)) {
						var userData = {
							userId: user.id,
							username: user.username,
							fullname: user.fullname,
							email: user.email,
							role: user.role,
						};
						req.session.data = userData;
						res.redirect("/home");
					} else {
						var message = "Algo ha sortit malament."; //Contrasenya incorrecta
						res.render("users/login", { message: message });
					}
				}
			});
		}
	}

	static register_get(req, res, next) {
		var user = {
			fullname: "",
			email: "",
		};
		res.render("users/register", { user: user });
	}

	static async register_post(req, res, next) {
		// Recuperem els errors possibles de validació
		const errors = validationResult(req);
		// Si tenim errors en les dades enviades
		if (!errors.isEmpty()) {
			var user = {
				fullname: req.body.fullname,
				email: req.body.email,
			};
			res.render("users/register", { errors: errors.array(), user: user });
		} else {
			const hashpwd = await bcrypt.hash(req.body.password, 12);
			var user = new User({
				fullname: req.body.fullname,
				email: req.body.email,
				password: hashpwd,
				role: ["professor"],
			});
			User.create(user, (error, newUser) => {
				if (error) {
					res.render("users/register", { error: error.message });
				} else {
					res.redirect("/auth/login");
				}
			});
		}
	}

	static logout_get(req, res, next) {
		req.session.destroy(function () {
			res.clearCookie("M12");
			res.redirect("/");
		});
	}

}

module.exports = authController;
