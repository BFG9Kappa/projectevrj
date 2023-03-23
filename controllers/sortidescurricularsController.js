var SortidaCurricular = require("../models/sortidacurricular");

const { body, validationResult } = require("express-validator");

class sortidacurricularController {
	static rules = [
		body("data_sortida", "La data de sortida no pot estar buida.")
			.trim()
			.isLength({ min: 1 })
			.escape(),
	];

	static async list(req, res, next) {
		try {
			var list_sortidescurriculars = await SortidaCurricular.find();
			res.render("sortidescurriculars/list", { list: list_sortidescurriculars });
		} catch (e) {
			res.send("Error!");
		}
	}

	static create_get(req, res, next) {
		var sortidacurricular = {
			data_sortida: "",
			lloc: "",
			ruta: "",
			objectius: "",
			grups: "",
			professors: "",
			hora_inici: "",
			hora_arribada: "",
			comentari: "",
			estat:"",
			_id: "",
		};
		res.render("sortidescurriculars/new", { sortidacurricular: sortidacurricular });
	}

	static async create_post(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("sortidescurriculars/new", {
            errors: errors.array(),
            sortidacurricular: req.body,
        });
    }

    try {
        const sortidacurricular = new SortidaCurricular({
            data_sortida: req.body.data_sortida,
            lloc: req.body.lloc,
            ruta: req.body.ruta,
            objectius: req.body.objectius,
            grups: req.body.grups,
            professors: req.body.professors,
            hora_inici: req.body.hora_inici,
            hora_arribada: req.body.hora_arribada,
            estat: req.body.estat,
        });

        await sortidacurricular.save();

        res.redirect("/sortidescurriculars");
    } catch (err) {
        console.error(err);
        res.render("sortidescurriculars/new", {
            error: err.message,
            sortidacurricular: req.body,
        });
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
		var sortidacurricular = new SortidaCurricular({
			data_sortida: req.body.data_sortida,
			lloc: req.body.lloc,
			ruta: req.body.ruta,
			objectius: req.body.objectius,
			grups: req.body.grups,
			professors: req.body.professors,
			hora_inici: req.body.hora_inici,
			hora_arribada: req.body.hora_arribada,
			estat: req.body.estat,
			_id: req.params.id,
		});

		try {
			await SortidaCurricular.findByIdAndUpdate(req.params.id, {
					hora_inici: req.body.horaInici,
					hora_arribada: req.body.horaArribada,
					estat: req.body.Estat
			});
			res.redirect('/sortidescurriculars');
	} catch (err) {
			res.render("sortidescurriculars/update", {
					error: err.message,
					sortidacurricular: req.body,
			});
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
