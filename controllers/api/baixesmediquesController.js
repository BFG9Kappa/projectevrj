var BaixaMedica = require("../../models/baixamedica");
const moment = require("moment");
const { body, validationResult } = require("express-validator");

class baixesmediquesController {
	static rules = [
		body("data_inicial_baixa")
		.notEmpty()
		.withMessage("La data inicial no pot estar buida.")
		.custom((value, { req }) => {
		  const data_actual = moment(req.body.data_actual, "DD-MM-YYYY");
		  const data_inicial_baixa = moment(value, "DD-MM-YYYY");
		  if (data_inicial_baixa.isBefore(data_actual)) {
			throw new Error(
			  "La data inicial de la baixa ha de ser igual o posterior a la data actual"
			);
		  }
		  return true;
		}),
		body("data_prevista_alta")
		.notEmpty()
		.withMessage("La data prevista d'alta no pot estar buida."),
		body("comentari")
		.notEmpty()
		.withMessage("El comentari no pot estar buit."),
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

	// Recuperar les baixes
	static async all(req, res, next) {

		try {
		  const result = await BaixaMedica.find().populate("user");
		  res.status(200).json(result)
		}
		catch(error) {
		  res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre les baixes mèdiques."}]})
		}
	}


  // Recuperar les baixes en pàgines paginades
	static async list(req, res, next) {
      // Configurar la paginació
      const options = {
        page: req.query.page || 1,  // Número pàgina
        limit: 5,       // Número registres per pàgina
        sort: { _id: -1 },   // Ordenats per id: el més nou el primer
      };

		try {
			const result = await BaixaMedica.paginate({}, options);
			res.status(200).json(result)
		}
		catch(error) {
			res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre les baixes mèdiques."}]})
		}
	}

	static async delete(req, res, next) {

		try {
		  const baixamed = await BaixaMedica.findByIdAndRemove(req.params.id)
		  res.status(200).json(baixamed)
		}
		catch {
		  res.status(402).json({errors: [{msg:"Hi ha hagut algun problema eliminant la baixa mèdica."}]})
		}
	  }

	  static async create(req, res, next) {
		const errors = validationResult(req);


		if (!errors.isEmpty()) {
			res.status(402).json({errors:errors.array()})
		}
		else {

			try {
			  const NewBaixaMedica = await BaixaMedica.create({
				data_inicial_baixa: req.body.data_inicial_baixa,
				data_prevista_alta: req.body.data_prevista_alta,
				comentari: req.body.comentari,
				document_justificatiu_medic: req.body.document_justificatiu_medic,
				_id: req.params.id,
			  })
			  res.status(200).json(NewBaixaMedica)
			} catch(error) {
			  res.status(402).json({errors: [{msg:"Hi ha hagut algun problema guardant la baixa mèdica"}]})
			}
		}
	}

	static async update(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
		  res.status(402).json({errors:errors.array()})
		}
		else {

		  var baixamedica = {
			data_inicial_baixa: req.body.data_inicial_baixa,
			data_prevista_alta: req.body.data_prevista_alta,
			comentari: req.body.comentari,
			document_justificatiu_medic: req.body.document_justificatiu_medic,
			_id: req.params.id,
		  }

		  try {
				const UpdateBaixaMedica = await BaixaMedica.findByIdAndUpdate(
					req.params.id, baixamedica, {runValidators: true})
				return res.status(200).json(UpdateBaixaMedica)
		  }
		  catch(error) {
			res.status(402).json({errors: [{msg:"Hi ha hagut algun problema actualitzant la baixa mèdica"}]})
		  }
		}
	}

}

module.exports = baixesmediquesController;
