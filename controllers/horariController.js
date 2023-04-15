var Horari = require("../models/horari");

class HorariController {
  static list(req, res, next) {

		// Franjes de horaris
		var taulahores = [
			"",
			"08:00 - 09:00",
			"09:00 - 10:00",
			"10:00 - 11:00",
			"11:00 - 11:30*",
			"11:30 - 12:30",
			"12:30 - 13:30",
			"13:30 - 14:30",
			"15:00 - 16:00",
			"16:00 - 17:00",
			"17:00 - 18:00",
			"18:00 - 18:30*",
			"18:30 - 19:30",
			"19:30 - 20:30",
			"20:30 - 21:30",
		];

    if (req.session.data) {
      Horari.find({ professor: req.session.data.userId }).exec(function (err, list_horari) {
        if (err) {
          return next(err);
        }

        // Preparem el array per imprimirlo
        const horari = new Array(15);
        for (let i = 0; i < 15; i++) {
          horari[i] = new Array(6);
        }

        for (let i = 0; i < 15; i++) {
          for (let j = 0; j < 6; j++) {
            horari[i][j] = {};
          }
        }

        list_horari.forEach(function (h) {
          horari[h.hora][h.dia].id = h.id;
          horari[h.hora][h.dia].materia = h.materia;
          horari[h.hora][h.dia].aula = h.aula;
          horari[h.hora][h.dia].grup = h.grup;
					horari[h.hora][h.dia].professor = h.professor;
        });

        res.render("horaris/list", { list: horari, taulahores: taulahores, user: req.session.data });
      });
    } else {
			res.render("horaris/list", { list: [], taulahores: taulahores, user: req.session.data });
    }
  }

	static create_get(req, res, next) {
		res.render("horaris/new");
	}

	static create_post(req, res) {
		Horari.create(req.body, function (error, newHorari) {
			if (error) {
				res.render("horaris/new", { error: error.message });
			} else {
				res.redirect("/horaris");
			}
		});
	}

	static update_get(req, res, next) {
		Horari.findById(req.params.id, function (err, horari) {
			if (err) {
				return next(err);
			}
			if (horari == null) {
				// Sense resultats.
				var err = new Error("Horari no trobat");
				err.status = 404;
				return next(err);
			} // Correcte.
			res.render("horaris/update", { horari: horari });
		});
	}

	static update_post(req, res, next) {
		var horari = new Horari({
			dia: req.body.dia,
			hora: req.body.hora,
			materia: req.body.materia,
			aula: req.body.aula,
			grup: req.body.grup,
			professor: req.body.professor,
			_id: req.params.id, // Fa falta per sobreescriure el objecte.
		});
		Horari.findByIdAndUpdate(
			req.params.id,
			horari,
			{ runValidators: true }, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
			function (err, horariFound) {
				if (err) {
					res.render("horaris/update", { horari: horari, error: err.message });
				}
				res.render("horaris/update", {
					horari: horari,
					message: "Horari actualitzat",
				});
			}
		);
	}

	static async delete_get(req, res, next) {
		res.render("horaris/delete", { id: req.params.id });
	}

	static async delete_post(req, res, next) {
		Horari.findByIdAndRemove(req.params.id, function (error) {
			if (error) {
				res.render("horaris", { error: error.message });
			} else {
				res.redirect("/horaris");
			}
		});
	}
}

module.exports = HorariController;
