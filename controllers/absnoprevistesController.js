var AbsenciaNoPrevista = require("../models/absnoprevista");

class absnoprevistaController {

    static list(req, res, next) {
      AbsenciaNoPrevista.find()        
          .exec(function (err, list_absencianoprevista) {
            if (err) {
              return next(err);
            }           
            res.render('absnoprevistes/list',{list: list_absencianoprevista})
        }); 
    	
    }
  
  static create_get(req, res, next) {
    res.render('absnoprevistes/new');
  }

  static create_post(req, res) {
    // console.log(req.body)
    AbsenciaNoPrevista.create(req.body, function (error, newAbsenciaNoPrevista) {
      if (error) {
        //console.log(error)
        res.render('absnoprevistes/new', { error: error.message })
      } else {
        res.redirect('/absnoprevistes')
      }
    })
  }
  
    static update_get(req, res, next) {
      AbsenciaNoPrevista.findById(req.params.id, function (err, absencianoprevista) {
          if (err) {
            return next(err);
          }
          if (absencianoprevista == null) {
            // No results.
            var err = new Error("Absencia no prevista not found");
            err.status = 404;
            return next(err);
          }
          // Success.
          res.render("absnoprevistes/update", { absencianoprevista: absencianoprevista });
      });
        
    }
  
    static update_post(req, res, next) {
        var absnoprevista = new AbsenciaNoPrevista({
          data_absnoprevista: req.body.data_absnoprevista,
          horari_profe: req.body.horari_profe,
          hores_ausencia: req.body.hores_ausencia,
          motius_abs: req.body.motius_abs,
          document_justificatiu: req.params.document_justificatiu,
          _id: req.params.id,  // Fa falta per sobreescriure el objecte.
        });    
      
        AbsenciaNoPrevista.findByIdAndUpdate(
          req.params.id,
          absencianoprevista,
          {},
          function (err, absencianoprevistaFound) {
            if (err) {
              res.render("absnoprevistes/update", { absencianoprevista: absencianoprevista, error: err.message });
  
            }
            res.render("absnoprevistes/update", { absencianoprevista: absencianoprevista, message: 'Absencia no prevista Updated'});
          
          }
        );
    }
  
    static async delete_get(req, res, next) {
        
        res.render('absnoprevistes/delete',{id: req.params.id})
    }
  
    static async delete_post(req, res, next) {
      
      AbsNoPrevista.findByIdAndRemove(req.params.id, (error)=> {
        if(error){
          res.redirect('/absnoprevistes')
        }else{
          res.redirect('/absnoprevistes')
        }
      }) 
    }
  
}

module.exports = absnoprevistaController;