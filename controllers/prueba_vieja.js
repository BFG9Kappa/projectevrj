/*static create_post(req, res) {
    const errors = validationResult(req);
    console.log(errors.array());
    // Tenim errors en les dades enviades

    if (!errors.isEmpty()) {
        var absnoprevista = {
            data_absnoprevista: req.body.data_absnoprevista,
            hores_ausencia: req.body.hores_ausencia,
            motiu_abs: req.body.motiu_abs,
            document_justificatiu: req.body.document_justificatiu,
            _id: req.params.id, // Fa falta per sobreescriure el objecte.
        };
        res.render("absnoprevistes/new", {
            errors: errors.array(),
            absnoprevista: absnoprevista,
        });

    } else {

        const uploadFile = upload.single('document_justificatiu'); // se especifica el nom del input que conté l'arxiu
  
        uploadFile(req, res, (err) => {
          if (err) {
            res.render('absnoprevistes/new', { error: err.message });

        } else {
            const absnoprevista = new AbsNoPrevista({
                data_absnoprevista: req.body.data_absnoprevista,
                hores_ausencia: req.body.hores_ausencia,
                motiu_abs: req.body.motiu_abs,
            });
            if (req.file) {
                absnoprevista.document_justificatiu = req.file.path;
            }
            absnoprevista.save((err) => {
                if (err) {
                    res.render("absnoprevistes/new", { error: err.message });
                } else {
                    res.redirect("/absnoprevistes");
                }
            });
        }
    });
}
}
*/