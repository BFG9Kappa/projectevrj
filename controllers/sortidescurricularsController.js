var SortidaCurricular = require("../models/sortidacurricular");

class sortidacurricularController {
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
    res.render('sortidescurriculars/new');
  }



  static create_post(req, res, next) {

    SortidaCurricular.create(req.body, (error, newRecord) => {
      if (error) {
        res.render('sortidescurriculars/new', { error: 'error' })
      } else {

        res.redirect('/sortidacurricular')
      }
    })
  }

  static update_get(req, res, next) {
    Sortidacurricular.findById(req.params.id, function (err, sortidacurricular) {
      if (err) {
        return next(err);
      }
      if (sortidacurricular == null) {
        // No results.
        var err = new Error("Publisher not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("sortidacurriculars/update", { sortidacurricular: sortidacurricular });
    });

  }

  static update_post(req, res, next) {
    var sortidacurricular = new Sortidacurricular({
      name: req.body.name,
      _id: req.params.id,
    });

    SortidaCurricular.findByIdAndUpdate(
      req.params.id,
      sortidacurricular,
      {},
      function (err, thesortidacurricular) {
        if (err) {
          res.render("sortidacurriculars/update", { sortidacurricular: sortidacurricular, error: err.message });

        }
        res.render("sortidacurriculars/update", { sortidacurricular: sortidacurricular, message: 'Sortidacurricular Updated' });

      }
    );
  }

  static async delete_get(req, res, next) {

    res.render('sortidacurriculars/delete', { id: req.params.id })
  }

  static async delete_post(req, res, next) {

    Publisher.findByIdAndRemove(req.params.id, (error) => {
      if (error) {
        res.redirect('/sortidacurricular')
      } else {
        res.redirect('/sortidacurricular')
      }
    })
  }

}

module.exports = sortidacurricularController;