var BaixaMedica = require("../models/baixamedica");

class baixamedicaController {

  static async list(req,res,next) {
    try {
      var list_baixesmediques = await Baixamedica.find();
      res.render('baixesmediques/list',{list:list_baixesmediques})   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static create_get(req, res, next) {
      res.render('baixesmediques/new');
  }

  
  static create_post(req, res) {
    // console.log(req.body)
    BaixaMedica.create(req.body, function (error, newBaixamedica)  {
        if(error){
            //console.log(error)
            res.render('baixesmediques/new',{error:error.message})
        }else{             
            res.redirect('/baixesmediques')
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

module.exports = baixamedicaController;