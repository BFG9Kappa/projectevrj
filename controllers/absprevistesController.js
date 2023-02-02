var AbsenciaPrevista = require("../models/absprevista");

class absprevistaController {
  
    static list(req, res, next) {
      AbsenciaPrevista.find()
          .exec(function (err, list_absprevista) {
            if (err) {
              return next(err);
            }
              res.render('absprevistes/list',{ list: list_absprevista })
        });
    }
  
  static create_get(req, res, next) {
      
        var AbsenciaPrevista = {
          "data_absprevista" : "",
          "motiu_abs" : ""
        }
        res.render('absprevistes/new',{AbsenciaPrevista:AbsenciaPrevista});
    }
  

  static create_post(req, res, next) {

    AbsenciaPrevista.create(req.body, (error, newRecord) => {
      if (error) {
        res.render('absprevistes/new', { error: 'error' })
      } else {

        res.redirect('/absprevistes')
      }
    })
  }
   
    static update_get(req, res, next) {
      AbsenciaPrevista.findById(req.params.id, function (err, absenciaprevista) {
          if (err) {
            return next(err);
          }
          if (absenciaprevista == null) {
            // No results.
            var err = new Error("Absencia prevista not found");
            err.status = 404;
            return next(err);
          }
          // Success.
          res.render("absprevistes/update", { absenciaprevista: absenciaprevista });
      });
        
    }
  
    static update_post(req, res, next) {
        var absenciaprevista = new AbsenciaPrevista({
          data_absprevista: req.body.data_absprevista,
          motiu_abs: req.body.motiu_abs,
          _id: req.params.id,
        });    
      
        AbsenciaPrevista.findByIdAndUpdate(
          req.params.id,
          AbsenciaPrevista,
          {},
          function (err, theAbsenciaPrevista) {
            if (err) {
              res.render("absprevistes/update", { absenciaprevista: absenciaprevista, error: err.message });
  
            }
            res.render("absprevistes/update", { absenciaprevista: absenciaprevista, message: 'Absencia Prevista Actualitzada'});
          
          }
        );
    }
 
    static async delete_get(req, res, next) {
        
        res.render('absprevistes/delete',{id: req.params.id})
    }
  
    static async delete_post(req, res, next) {
      AbsenciaPrevista.findByIdAndRemove(req.params.id, (error)=> {
        if(error){
          res.redirect('/absprevistes')
        }else{
          res.redirect('/absprevistes')
        }
      }) 
    }
  
}

module.exports = absprevistaController;