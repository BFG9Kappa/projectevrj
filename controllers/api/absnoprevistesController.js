var AbsNoPrevista = require("../../models/absnoprevista");
const moment = require("moment");
const { body, validationResult } = require("express-validator");

class absnoprevistesController {
	static rules = [
		// validar motiu_abs, no pot estar buit i s'eliminen els espais en blanc a l'inici i al final del text
		body("motiu_abs")
			.notEmpty()
			.withMessage("El motiu de l'absència no pot estar buit."),
		// validar data_absnoprevista, no pot estar buida la data d'absència no prevista
		body("data_absnoprevista")
		.notEmpty()
		.withMessage("La data d'absència no pot estar buida.")
		.custom((value, { req }) => {
			const data_actual = moment().startOf('day');
			const data_absnoprevista = moment(req.body.data_absnoprevista);
			if (!data_absnoprevista.isSame(data_actual, 'day')) {
					throw new Error("La data d'absència no prevista ha de ser la mateixa que la data actual.");
			}
			return true;
	}),
	// Validación de hora_inici
	body("hora_inici_absnoprevista").notEmpty().withMessage("La hora d'inici no pot estar buida."),
	// Validación de hora_arribada
	body("hora_final_absnoprevista").notEmpty().withMessage("La hora final de l'absència no pot estar buida.")
	.custom((value, { req }) => {
		const hora_inici_absnoprevista = moment(req.body.hora_inici_absnoprevista, "HH:mm");
		const hora_final_absnoprevista = moment(value, "HH:mm");
		if (hora_final_absnoprevista.isSameOrBefore(hora_inici_absnoprevista)) {
			throw new Error("La hora d'arribada ha de ser posterior a la hora d'inici.");
		}
		return true;
	})
	];

	// Recuperar les absències no previstes
	static async all(req, res, next) {

		try {
		  const result = await AbsNoPrevista.find();
		  res.status(200).json(result)
		}
		catch(error) {
		  res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre les absències no previstes."}]})
		}
	}


  // Recuperar les absències no previstes en pàgines
	static async list(req, res, next) {
      // Configurar la paginació
      const options = {
        page: req.query.page || 1,  // Número pàgina
        limit: 5,       // Número registres per pàgina
        sort: { _id: -1 },   // Ordenats per id: el més nou el primer
      };

		try {
			const result = await AbsNoPrevista.paginate({}, options);
			res.status(200).json(result)
		}
		catch(error) {
			res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre les absències no previstes."}]})
		}
	}

	  static async delete(req, res, next) {

		try {
		  const absnoprevista = await AbsNoPrevista.findByIdAndRemove(req.params.id)
		  res.status(200).json(absnoprevista)
		}
		catch {
		  res.status(402).json({errors: [{msg:"Hi ha hagut algun problema eliminant l'absència no prevista."}]})
		}

	  }
	  static async create(req, res, next) {
		const errors = validationResult(req);


		if (!errors.isEmpty()) {
			res.status(402).json({errors:errors.array()})
		}
		else {

			try {
				req.body.data_absnoprevista = new Date(req.body.data_absnoprevista);
			  const NewAbsNoPrevista = await AbsNoPrevista.create({
				data_absnoprevista: req.body.data_absnoprevista.toISOString(),
				hora_inici_absnoprevista: req.body.hora_inici_absnoprevista,
     	  hora_final_absnoprevista: req.body.hora_final_absnoprevista,
				motiu_abs: req.body.motiu_abs,
				document_justificatiu: req.body.document_justificatiu,
				_id: req.params.id, // Fa falta per sobreescriure el objecte.
			  })
			  res.status(200).json(NewAbsNoPrevista)
			} catch(error) {
			  res.status(402).json({errors: [{msg:"Hi ha hagut algun problema guardant l'absència no prevista"}]})
			}
		}
	}

	static async update(req, res, next) {
		try {
			const validations = [
				body('motiu_abs').notEmpty().withMessage('El motiu de l\'absència no pot estar buit.'),
				// Validación de hora_inici
				body('hora_inici_absnoprevista').notEmpty().withMessage('La hora d\'inici no pot estar buida.'),
				// Validación de hora_arribada
				body('hora_final_absnoprevista').notEmpty().withMessage('La hora final de l\'absència no pot estar buida.')
				.custom((value, { req }) => {
					const hora_inici_absnoprevista = moment(req.body.hora_inici_absnoprevista, "HH:mm");
					const hora_final_absnoprevista = moment(value, "HH:mm");
					if (hora_final_absnoprevista.isSameOrBefore(hora_inici_absnoprevista)) {
						throw new Error("La hora d'arribada ha de ser posterior a la hora d'inici.");
					}
					return true;
				})
			];
			// Validar
			await Promise.all(validations.map(validation => validation.run(req)))
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				res.status(402).json({errors:errors.array()})
			}
			else {

				var absnoprevista = {
					data_absnoprevista: req.body.data_absnoprevista,
					hora_inici_absnoprevista: req.body.hora_inici_absnoprevista,
					hora_final_absnoprevista: req.body.hora_final_absnoprevista,
					motiu_abs: req.body.motiu_abs,
					document_justificatiu: req.body.document_justificatiu,
					_id: req.params.id,
				}

				const UpdateAbsNoprevista = await AbsNoPrevista.findByIdAndUpdate(
					req.params.id, absnoprevista, {runValidators: true})
				return res.status(200).json(UpdateAbsNoprevista)
			}
		} catch(error) {
			res.status(402).json({errors: [{msg:"Hi ha hagut algun problema actualitzant l'absència no prevista"}]})
		}
	}
}


module.exports = absnoprevistesController;
