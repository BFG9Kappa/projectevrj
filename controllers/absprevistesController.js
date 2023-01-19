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
  /*
    static update_get(req, res, next) {
      Publisher.findById(req.params.id, function (err, publisher) {
          if (err) {
            return next(err);
          }
          if (publisher == null) {
            // No results.
            var err = new Error("Publisher not found");
            err.status = 404;
            return next(err);
          }
          // Success.
          res.render("publishers/update", { publisher: publisher });
      });
        
    }
  
    static update_post(req, res, next) {
        var publisher = new Publisher({
          name: req.body.name,
          _id: req.params.id,
        });    
      
        Publisher.findByIdAndUpdate(
          req.params.id,
          publisher,
          {},
          function (err, thepublisher) {
            if (err) {
              res.render("publishers/update", { publisher: publisher, error: err.message });
  
            }
            res.render("publishers/update", { publisher: publisher, message: 'Publisher Updated'});
          
          }
        );
    }
  
    static async delete_get(req, res, next) {
        
        res.render('publishers/delete',{id: req.params.id})
    }
  
    static async delete_post(req, res, next) {
      
      Publisher.findByIdAndRemove(req.params.id, (error)=> {
        if(error){
          res.redirect('/publisher')
        }else{
          res.redirect('/publisher')
        }
      }) 
    }
  */
}

module.exports = absprevistaController;