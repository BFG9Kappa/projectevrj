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
				hores_ausencia: req.body.hores_ausencia,
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
		const errors = validationResult(req);  
	
		if (!errors.isEmpty()) {      
		  res.status(402).json({errors:errors.array()})      
		}
		else {    
		  
		  var absnoprevista = {
			data_absnoprevista: req.body.data_absnoprevista,
			hores_ausencia: req.body.hores_ausencia,
			motiu_abs: req.body.motiu_abs,
			document_justificatiu: req.body.document_justificatiu,
			_id: req.params.id,
		  }
	
		  try {
				const UpdateAbsNoprevista = await AbsNoPrevista.findByIdAndUpdate(
					req.params.id, absnoprevista, {runValidators: true})
				return res.status(200).json(UpdateAbsNoprevista)
		  }
		  catch(error) {
			res.status(402).json({errors: [{msg:"Hi ha hagut algun problema actualitzant l'absència no prevista"}]})          
		  }
			 
		}
		  
	  }


}

module.exports = absnoprevistesController;
