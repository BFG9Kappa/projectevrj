var BaixaMedica = require("../models/baixamedica");

class baixesmediquesController {

  static async list(req, res, next) {
    try {
      var list_baixesmediques = await BaixaMedica.find();
      res.render('baixesmediques/list', { list: list_baixesmediques })
    } catch (e) {
      res.send('Error!');
    }
  }

  static create_get(req, res, next) {
    res.render('baixesmediques/new');
  }

  static create_post(req, res) {
    // console.log(req.body)
    BaixaMedica.create(req.body, function (error, newBaixamedica) {
      if (error) {
        //console.log(error)
        res.render('baixesmediques/new', { error: error.message })
      } else {
        res.redirect('/baixesmediques')
      }
    })
  }

  static update_get(req, res, next) {
    BaixaMedica.findById(req.params.id, function (err, baixamedica) {
      if (err) {
        return next(err);
      }
      if (baixamedica == null) {
        // No results.
        var err = new Error("BaixaMedica not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("baixesmediques/update", { baixamedica: baixamedica });
    });
  }
  
  static update_post(req, res, next) {
      var baixamedica = new BaixaMedica({
        name: req.body.name,
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
          res.render("baixesmediques/update", { baixamedica: baixamedica, message: 'Publisher Updated'});
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