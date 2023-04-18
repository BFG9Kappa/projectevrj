const SortidaCurricular = require("../models/sortidacurricular");
const User = require("../models/user");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

class sortidacurricularController {
  static rules = [
    body("data_sortida")
		.notEmpty()
		.withMessage("La data d'absència no pot estar buida.")
    .custom((value, { req }) => {
		  const data_actual = moment(req.body.data_actual, "DD-MM-YYYY");
		  const data_sortida = moment(value, "DD-MM-YYYY");
		  if (data_sortida.isBefore(data_actual)) {
			throw new Error(
			  "La data de la sortida ha de ser igual o posterior a la data actual"
			);
		  }
		  return true;
		})
  ];

  static async list(req, res, next) {
    try {
      var list_sortidescurriculars = await SortidaCurricular.find();
      res.render("sortidescurriculars/list", {
        list: list_sortidescurriculars,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static create_get(req, res, next) {
		User.find({ role: 'professor' })
		.then(professors => {
			var sortidacurricular = {
				data_actual: "",
				data_sortida: "",
				email: "",
				lloc: "",
				ruta: "",
				objectius: "",
				grups: "",
				professor: "",
				hora_inici: "",
				hora_arribada: "",
				comentari: "",
				estat: "",
				_id: "",
			};
			res.render("sortidescurriculars/new", {
				sortidacurricular: sortidacurricular,professors
			});

    })
		.catch(err => {
      console.error(err);
      res.redirect('/horaris');
    });
  }

  static create_post(req, res) {
    const errors = validationResult(req);
    //console.log(errors.array());
    // Tenim errors en les dades enviades
    if (!errors.isEmpty()) {
      var sortidacurricular = {
        data_sortida: req.body.data_sortida,
        email: req.body.email,
        lloc: req.body.lloc,
        ruta: req.body.ruta,
        objectius: req.body.objectius,
        grups: req.body.grups,
        professor: req.body.professor,
        hora_inici: req.body.hora_inici,
        hora_arribada: req.body.hora_arribada,
        estat: req.body.estat,
        _id: req.params.id,
      };
      res.render("sortidescurriculars/new", {
        errors: errors.array(),
        sortidacurricular: sortidacurricular,
      });
    } else {
      SortidaCurricular.create(req.body, function (error, newSortidaCurricular) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'USER', //email que enviara el correo de la sortida
            pass: 'PASSWORD' //hay que poner la contraseña del gmail que quiere enviar el correo
          }
          });

          const mailOptions = {
            from: "MAIL", // Correu desde on es envie el missatge.
            to: req.body.email, // Correo del destinatari, obtingut desde el formulari.
            subject: "Sortida curricular creada",
            text: "Hola " + req.body.email + ", Teniu una absència generada. \n Indiqueu per cada hora la tasca de l'alumnat corresponent. \n Això es un correu generat automàticament, per favor no responeu aquest mail.",
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Correu electrónic enviat: " + info.response);
            }
          });
          if (error) {
            res.render("sortidescurriculars/new", { error: error.message });
          } else {
            res.redirect("/sortidescurriculars");
          }
        }
      );
    }
  }

  static update_get(req, res, next) {
    SortidaCurricular.findById(
      req.params.id,
      function (err, sortidacurricular) {
        if (err) {
          return next(err);
        }
        if (sortidacurricular == null) {
          // No results.
          var err = new Error("Sortida curricular no trobada");
          err.status = 404;
          return next(err);
        }
        // Success.
        res.render("sortidescurriculars/update", {
          sortidacurricular: sortidacurricular,
        });
      }
    );
  }

  static async update_post(req, res, next) {
    const errors = validationResult(req);

		if (!errors.isEmpty()) {
			SortidaCurricular.findById(req.params.id, function (error, sortidacurricular) {
				if (error) {
					return next(error);
				}
				if (sortidacurricular == null) {
					var error = new Error("Sortida curricular no trobada");
					error.status = 404;
					return next(error);
				}
				res.render("sortidescurriculars/update", {
					errors: errors.array(),
					sortidacurricular: sortidacurricular,
				});
			});
		} else {
			var sortidacurricular = {
        data_sortida: req.body.data_sortida,
        email: req.body.email,
        lloc: req.body.lloc,
        ruta: req.body.ruta,
        objectius: req.body.objectius,
        grups: req.body.grups,
        professors: req.body.professors,
        hora_inici: req.body.hora_inici,
        hora_arribada: req.body.hora_arribada,
        estat: req.body.estat,
        _id: req.params.id,
      };
			SortidaCurricular.findByIdAndUpdate(
				req.params.id,
				sortidacurricular,
				{},
				function (error, sortidacurricularFound) {
					if (error) {
						res.render("sortidescurriculars/update", {
							sortidacurricular: sortidacurricular,
							error: error.message,
						});
					}
					res.render("sortidescurriculars/update", {
						sortidacurricular: sortidacurricular,
						message: "La sortida curricular ha estat actualitzada",
					});
				}
			);
		}
}


  static async delete_get(req, res, next) {
    res.render("sortidescurriculars/delete", { id: req.params.id });
  }

  static async delete_post(req, res, next) {
    SortidaCurricular.findByIdAndRemove(req.params.id, (error) => {
      if (error) {
        res.render("sortidescurriculars", { error: error.message });
      } else {
        res.redirect("/sortidescurriculars");
      }
    });
  }
}

module.exports = sortidacurricularController;
