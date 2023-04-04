/*
static create_post(req, res) {
		
    const uploadFile = upload.single('document_justificatiu'); // se especifica el nom del input que conté l'arxiu
    uploadFile(req, res, (err) => {
        if (err) {
            res.render('absnoprevistes/new', { error: err.message });
        } else {
            // Rellenar los campos y adjuntar el archivo document_justificatiu
            const absnoprevista = new AbsNoPrevista({
                data_absnoprevista: req.body.data_absnoprevista,
                hores_ausencia: req.body.hores_ausencia,
                motiu_abs: req.body.motiu_abs,
            });

            if (req.file) {
                absnoprevista.document_justificatiu = req.file.path;
            }

            // Validaciones
            const errors = validationResult(absnoprevista);
            console.log(errors.array());
            if (!errors.isEmpty()) {
                res.render("absnoprevistes/new", {
                    errors: errors.array(),
                    absnoprevista: absnoprevista,
                });
            } else {
                absnoprevista.save((err) => {
                    if (err) {
                        res.render("absnoprevistes/new", { error: err.message });
                    } else {
                        res.redirect("/absnoprevistes");
                    }
                });
            }
        }
    });
}

*/