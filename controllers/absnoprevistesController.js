var AbsNoPrevista = require("../models/absnoprevista");
const { body, validationResult } = require("express-validator");

//varible per a relitzar el emmagatzematge de PDF a una carpeta
const multer = require('multer');

// Configurar Multer diskStorage per a estructura de emmagatzematge
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split('.').pop());
	},
});

// Inicialitzar Multer upload middleware
const upload = multer({ storage: storage });

class absnoprevistesController {

	static rules = [
		// validar hores_ausencia, no pueden estar buides y han de ser numeros enters de 1 a 8
		body('hores_ausencia').notEmpty().withMessage('Les hores d\'absència són obligatòries.').isInt({min:1, max:8}).withMessage('Les hores d\'absència han de ser d\'1 a 8.').escape(),
		// validar motiu_abs, no puede estar vacío y se eliminan los espacios en blanco al inicio y al final del texto
		body('motiu_abs').notEmpty().withMessage('El motiu de l\'absència és obligatori.').trim().isLength({min: 1}).withMessage('El motiu de l\'absència ha de tenir almenys 1 caràcter.').escape()
	];
	
	static async list(req, res, next) {
		try {
			var list_absnoprevistes = await AbsNoPrevista.find();
			res.render("absnoprevistes/list", { list: list_absnoprevistes });
		} catch (error) {
			res.send(error);
		}
	}

    static create_get(req, res, next) {
        var absnoprevista = new AbsNoPrevista({
            data_absnoprevista: new Date(),
            hores_ausencia: "",
            motiu_abs: "",
        });
        res.render("absnoprevistes/new", { absnoprevista: absnoprevista });
    }

	static create_post(req, res) {
		const uploadFile = upload.single('document_justificatiu'); // se especifica el nom del input que conté l'arxiu
		uploadFile(req, res, (err) => {
		  if (err) {
			res.render('absnoprevistes/new', { error: err.message });
		  } else {
			// Rellenar los campos y adjuntar el archivo document_justificatiu
			const absnoprevista = new AbsNoPrevista({
			  data_absnoprevista: req.body.data_absnoprevista || new Date(),
			  hores_ausencia: req.body.hores_ausencia,
			  motiu_abs: req.body.motiu_abs,
			});
	  
			if (req.file) {
			  absnoprevista.document_justificatiu = req.file.path;
			}
	  
			// Validaciones
			const errors = validationResult(req);
			console.log(errors.array());
			if (errors.isEmpty()) {
			  res.render("absnoprevistes/new", {
				errors: errors.array(),
				absnoprevista: absnoprevista,
			  });
			} else {
			  absnoprevista.save((err) => {
				if (err) {
				  res.render("absnoprevistes/new", { error: err.message });
				} else {
				  res.redirect("/absnoprevistes");
				}
			  });
			}
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
			document_justificatiu: req.body.document_justificatiu,
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
