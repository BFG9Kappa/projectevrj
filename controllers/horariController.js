var Horari = require("../models/horari");

class HorariController {

    static list(req,res,next) {
      Horari.find()        
          .exec(function (err, list_horari) {
            if (err) {
              return next(err);
            }
            //res.send('prova horari');
            res.render('horaris/list',{list:list_horari})
        }); 		
    }

}

module.exports = HorariController;