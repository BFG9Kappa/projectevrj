var AbsenciaPrevista = require("../../models/absprevista");
const { body, validationResult } = require("express-validator");

class absprevistaController {

	static rules = [
		body("data_absprevista", "La data de l'absència prevista no pot estar buida.")
			.trim()
			.isLength({ min: 1 })
			.escape(),

		body("motiu_abs", "El motiu de l'absència no pot estar buit.")
			.trim()
			.isLength({ min: 1 })
			//.escape()
			,

			body("motiu_abs", "El motiu ha de tindre com a mínim 5 caràcters.")
      .trim()
      .isLength({ min: 5})
      //.escape()
			,
	];

	// Recuperar les absències previstes
	static async all(req, res, next) {
  
		try {
		  const result = await AbsenciaPrevista.find();
		  res.status(200).json(result) 
		}
		catch(error) {
		  res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre les absències previstes."}]})
		}   
	}


  // Recuperar les absències previstes en pàgines
  static async list(req, res, next) {
	// Configurar la paginació
	const options = {
	  page: req.query.page || 1,  // Número pàgina
	  limit: 5,       // Número registres per pàgina
	  sort: { _id: -1 },   // Ordenats per id: el més nou el primer
	};

	  try {
		  const result = await AbsenciaPrevista.paginate({}, options);
		  res.status(200).json(result)
	  }
	  catch(error) {
		  res.status(402).json({errors: [{msg:"Hi ha hagut problemes en rebre les absències previstes."}]})
	  }
  }

  static async create(req, res, next) {
	const errors = validationResult(req);  


	if (!errors.isEmpty()) {
		res.status(402).json({errors:errors.array()}) 
	}
	else { 

		try {		
		  const NewAbsPrevista = await AbsenciaPrevista.create({
			data_absprevista: req.body.data_absprevista,
			motiu_abs: req.body.motiu_abs,
			_id: req.params.id,
		  })
		  res.status(200).json(NewAbsPrevista)
		} catch(error) {
		  res.status(402).json({errors: [{msg:"Hi ha hagut algun problema guardan l'absència prevista"}]})          
		}        
	}
}

static async delete(req, res, next) {

	try {       
	  const absprevista = await AbsenciaPrevista.findByIdAndRemove(req.params.id)
	  res.status(200).json(absprevista)
	}
	catch {
	  res.status(402).json({errors: [{msg:"Hi ha hagut algun problema eliminant l'absència prevista."}]})
	}   
	
  }

  static async update(req, res, next) {
	const errors = validationResult(req);  

	if (!errors.isEmpty()) {      
	  res.status(402).json({errors:errors.array()})      
	}
	else {    
	  
	  var absprevista = {
		data_absprevista: req.body.data_absprevista,
		motiu_abs: req.body.motiu_abs,
		_id: req.params.id,
	  }

	  try {
			const UpdateAbsNoprevista = await AbsenciaPrevista.findByIdAndUpdate(
				req.params.id, absprevista, {runValidators: true})
			return res.status(200).json(UpdateAbsNoprevista)
	  }
	  catch(error) {
		res.status(402).json({errors: [{msg:"Hi ha hagut algun problema actualitzant l'absència prevista"}]})          
	  }
		 
	}
	  
  }



}

module.exports = absprevistaController;
