var Horari = require("../models/horari");

class HorariController {

    // Version 1
    static async list(req, res, next) {
        try {
            var list_horaris = await Horari.find();
            res.render('horaris/list', { list: list_horaris })
        }
        catch (e) {
            res.send('Error!');
        }
    }
}

module.exports = HorariController;