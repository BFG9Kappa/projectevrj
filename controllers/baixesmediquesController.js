var BaixaMedica = require("../models/baixamedica");
const moment = require('moment');
const { body, validationResult } = require("express-validator");

class baixesmediquesController {
  static rules = [
      body("data_inicial_baixa", "La data inicial de baixa no pot estar buida.")
      .trim()
      .isLength({ min: 1 })
      .escape()
			,

      body("data_prevista_alta", "La data prevista d'alta no pot estar buida.")
      .trim()
      .isLength({ min: 1 })
      .escape()
			,

			body('data_prevista_alta')
			.custom((value, { req }) => {
				const data_inicial_baixa = moment(req.body.data_inicial_baixa, 'DD-MM-YYYY');
				const data_prevista_alta = moment(value, 'DD-MM-YYYY');
				if (data_prevista_alta.isBefore(data_inicial_baixa)) {
					throw new Error('La data prevista alta ha de ser posterior a la data inicial de la baixa');
				}
				return true;
			}),

];

  static async list(req, res, next) {
    try {
      var list_baixesmediques = await BaixaMedica.find();
      res.render('baixesmediques/list', { list: list_baixesmediques })
    }
    catch (e) {
      res.send('Error!');
    }
  }

  static create_get(req, res, next) {
    var baixamedica = {
      "data_inicial_baixa" : "",
      "data_prevista_alta" : "",
      "comentari" : "",
      "_id" : ""
    }
    res.render('baixesmediques/new',{baixamedica:baixamedica});
  }



  static create_post(req, res) {
    const errors = validationResult(req);
    console.log(errors.array())
    // Tenim errors en les dades enviades
			// El formulario es válido, se puede procesar la información
			// ...


    if (!errors.isEmpty()) {
      var baixamedica = {
        "data_inicial_baixa": req.body.data_inicial_baixa,
        "data_prevista_alta": req.body.data_prevista_alta,
        "comentari": req.body.comentari,
        "_id": req.params.id,
      }
      res.render('baixesmediques/new',{errors:errors.array(), baixamedica: baixamedica})
    }
    else {
    BaixaMedica.create(req.body, function (error, newBaixamedica) {
      if (error) {
        //console.log(error)
        res.render('baixesmediques/new', { error: error.message })
      } else {
        res.redirect('/baixesmediques')
      }
    })
  }

}


    static update_get(req, res, next) {
      BaixaMedica.findById(req.params.id, function (err, baixamedica) {
          if (err) {
            return next(err);
          }
          if (baixamedica == null || baixamedica == "") {
            // No results.
            var err = new Error("BaixaMedica no trobada");
            err.status = 404;
            return next(err);
          }
          // Success.
          res.render("baixesmediques/update", { baixamedica: baixamedica });
      });

    }

    static update_post(req, res, next) {
        var baixamedica = new BaixaMedica({
          data_inicial_baixa: req.body.data_inicial_baixa,
          data_prevista_alta: req.body.data_prevista_alta,
          comentari: req.body.comentari,
          _id: req.params.id,
        });

        BaixaMedica.findByIdAndUpdate(
          req.params.id,
          baixamedica,
          {},

          function (err, baixamedicaFound) {
            if (err) {
              res.render("baixesmediques/update", { baixamedica: baixamedica, error: err.message });

            }
            res.render("baixesmediques/update", { baixamedica: baixamedica, message: 'Baixa mèdica actualitzada'});

          }

        );
    }

    static async delete_get(req, res, next) {

        res.render('baixesmediques/delete',{id: req.params.id})
    }

    static async delete_post(req, res, next) {

      BaixaMedica.findByIdAndRemove(req.params.id, (error)=> {
        if(error){
          res.redirect('/baixesmediques')
        }else{
          res.redirect('/baixesmediques')
        }
      })
    }

}

module.exports = baixesmediquesController;
