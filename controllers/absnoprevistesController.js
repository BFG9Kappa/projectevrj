var AbsenciaNoPrevista = require("../models/absnoprevista");

class absnoprevistaController {
  /*
    static list(req, res, next) {
      Publisher.find()        
          .exec(function (err, list) {
            if (err) {
              return next(err);
            }
            
            res.render('publishers/list',{list:list})
        }); 
    	
    }
  */
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

module.exports = absnoprevistaController;