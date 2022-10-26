var Usuari = require("../models/usuari");


class usuariController {

	static list(req, res, next) {
		Usuari.find()        
        .exec(function (err, list) {
          if (err) {
            return next(err);
          }
          
          res.render('usuari/list',{list:list})
      }); 
		
	}

  static create_get(req, res, next) {
      res.render('usuari/new');
  }

  

  static create_post(req, res, next) {
    
    Usuari.create(req.body, (error, newRecord) => {
        if(error){
            res.render('usuari/new',{error:'error'})
        }else{
             
            res.redirect('/usuari')
        }
    })
  }

  static update_get(req, res, next) {
    Usuari.findById(req.params.id, function (err, usuari) {
        if (err) {
          return next(err);
        }
        if (usuari == null) {
          // No results.
          var err = new Error("Usuari not found");
          err.status = 404;
          return next(err);
        }
        // Success.
        res.render("usuaris/update", { usuari: usuari });
    });
      
  }

  static update_post(req, res, next) {
      var usuari = new Usuari({
        name: req.body.name,
        _id: req.params.id,
      });    
    
      Usuari.findByIdAndUpdate(
        req.params.id,
        usuari,
        {},
        function (err, theusuari) {
          if (err) {
            res.render("usuaris/update", { usuari: usuari, error: err.message });

          }
          res.render("usuaris/update", { usuari: usuari, message: 'Usuari Updated'});
        
        }
      );
  }

  static async delete_get(req, res, next) {
      
      res.render('usuaris/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
    
    Usuari.findByIdAndRemove(req.params.id, (error)=> {
      if(error){
        res.redirect('/usuari')
      }else{
        res.redirect('/usuari')
      }
    }) 
  }

}

module.exports = usuariController;
