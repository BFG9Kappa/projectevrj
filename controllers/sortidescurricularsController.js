var SortidaCurricular = require("../models/sortidacurricular");

class sortidacurricularController {
	static list(req, res, next) {
		SortidaCurricular.find().exec(function (err, list_sortidacurricular) {
			if (err) {
				return next(err);
			}
			res.render("sortidescurriculars/list", { list: list_sortidacurricular });
		});
	}

	static create_get(req, res, next) {
		res.render("sortidescurriculars/new");
	}

	static create_post(req, res, next) {
		SortidaCurricular.create(req.body, (error, newSortidaCurricular) => {
			if (error) {
				res.render("sortidescurriculars/new", { error: "error" });
			} else {
				res.redirect("/sortidescurriculars");
			}
		});
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

	static update_post(req, res, next) {
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

		SortidaCurricular.findByIdAndUpdate(
			req.params.id,
			sortidacurricular,
			{},
			function (err, thesortidacurricular) {
				if (err) {
					res.render("sortidacurriculars/update", {
						sortidacurricular: sortidacurricular,
						error: err.message,
					});
				}
				res.render("sortidacurriculars/update", {
					sortidacurricular: sortidacurricular,
					message: "Sortida curricular actualitzada",
				});
			}
		);
	}

	static async delete_get(req, res, next) {
		res.render("sortidescurriculars/delete", { id: req.params.id });
	}

	static async delete_post(req, res, next) {
		SortidaCurricular.findByIdAndRemove(req.params.id, (error) => {
			if (error) {
				res.redirect("/sortidescurriculars");
			} else {
				res.redirect("/sortidescurriculars");
			}
		});
	}
}

module.exports = sortidacurricularController;
