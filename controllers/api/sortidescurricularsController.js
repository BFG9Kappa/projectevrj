var SortidaCurricular = require("../../models/sortidacurricular");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const nodemailer = require('nodemailer');

class sortidacurricularController {
		static rules = [
			body("data_sortida")
			.notEmpty()
			.withMessage("La data de la sortida no pot estar buida.")
			.custom((value, { req }) => {
				const data_actual = moment(req.body.data_actual, "DD-MM-YYYY");
				const data_sortida = moment(value, "DD-MM-YYYY");
				if (data_sortida.isBefore(data_actual)) {
				throw new Error(
					"La data de la sortida ha de ser igual o posterior a la data actual"
				);
			}
				return true;
			}),
				// Validación de hora_inici
				body("hora_inici").notEmpty().withMessage("La hora d'inici no pot estar buida."),
				// Validación de hora_arribada
				body("hora_arribada").notEmpty().withMessage("La hora d'arribada no pot estar buida.")
				.custom((value, { req }) => {
					const hora_inici = moment(req.body.hora_inici, "HH:mm");
					const hora_arribada = moment(value, "HH:mm");
					if (hora_arribada.isSameOrBefore(hora_inici)) {
						throw new Error("La hora d'arribada ha de ser posterior a la hora d'inici.");
					}
					return true;
				})
		];
	// Recuperar sortides curriculars
	static async all(req, res, next) {

		try {
		  const result = await SortidaCurricular.find().populate("professors");
		  res.status(200).json(result)
		}
		catch(error) {
		  res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre les sortides curriculars."}]})
		}
	}


  // Recuperar les sortides curriculars paginades
	static async list(req, res, next) {
      // Configurar la paginació
      const options = {
        page: req.query.page || 1,  // Número pàgina
        limit: 5,       // Número registres per pàgina
        sort: { _id: -1 },   // Ordenats per id: el més nou el primer
      };

		try {
			const result = await SortidaCurricular.paginate({}, options);
			res.status(200).json(result)
		}
		catch(error) {
			res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre les sortides curriculars."}]})
		}
	}

	static async delete(req, res, next) {

		try {
		  const sortidaCurr = await SortidaCurricular.findByIdAndRemove(req.params.id)
		  res.status(200).json(sortidaCurr)
		}
		catch {
		  res.status(402).json({errors: [{msg:"Hi ha hagut algun problema eliminant la sortida curricular."}]})
		}
	  }

	  static async create(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(402).json({errors:errors.array()})
		}
		else {
			try {
			  const NewSortidaCurricular = await SortidaCurricular.create({
				data_sortida: req.body.data_sortida,
				email: req.body.email,
				lloc: req.body.lloc,
				ruta: req.body.ruta,
				objectius: req.body.objectius,
				grups: req.body.grups,
				professors: req.body.professors,
				hora_inici: req.body.hora_inici,
				hora_arribada: req.body.hora_arribada,
				estat: req.body.estat,
				_id: req.params.id,
			  })
			  res.status(200).json(NewSortidaCurricular)
			} catch(error) {
			  res.status(402).json({errors: [{msg:"Hi ha hagut algun problema guardant la sortida curricular"}]})
			}
		}
	}

	static async update(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
		  res.status(402).json({errors:errors.array()})
		}
		else {

		  var sortidacurricular = {
			data_sortida: req.body.data_sortida,
			email: req.body.email,
			lloc: req.body.lloc,
			ruta: req.body.ruta,
			objectius: req.body.objectius,
			grups: req.body.grups,
			professors: req.body.professors,
			hora_inici: req.body.hora_inici,
			hora_arribada: req.body.hora_arribada,
			estat: req.body.estat,
			_id: req.params.id,
		  }

		  try {
				const UpdateSortidaCurricular = await SortidaCurricular.findByIdAndUpdate(
					req.params.id, sortidacurricular, {runValidators: true})
				return res.status(200).json(UpdateSortidaCurricular)
		  }
		  catch(error) {
			res.status(402).json({errors: [{msg:"Hi ha hagut algun problema actualitzant la sortida curricular"}]})
		  }
		}
	}


}

module.exports = sortidacurricularController;
