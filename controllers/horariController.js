var Horari = require("../models/horari");

//const { body, validationResult } = require("express-validator"); // Validacions

class HorariController {

  /* //Validacions
  static rules = [
    // Validate and sanitize fields.
    body("name")
      .trim()
      .isLength({ min: 1})
      .withMessage('Name must not be empty.')
      .isLength({ max: 20})
      .withMessage('Name is too long.')
      .escape()
      .custom(async function(value, {req}) {
          const genre = await Genre.findOne({name:value});
          if (genre) {
            if(req.params.id!==genre.id ) {
              throw new Error('This gender name already exists.');
            }
          }
          return true;
      })
  ];
  */

  static list(req, res, next) {
    Horari.find()
      .exec(function (err, list_horari) {
        if (err) {
          return next(err);
        }
        res.render('horaris/list', { list: list_horari })
      });
  }

  static create_get(req, res, next) {
    res.render('horaris/new');
  }

  static create_post(req, res) {
    // console.log(req.body)
    Horari.create(req.body, function (error, newHorari)  {
        if(error){
            //console.log(error)
            res.render('horaris/new',{error:error.message})
        }else{             
            res.redirect('/horaris')
        }
    })    
  }

}

module.exports = HorariController;