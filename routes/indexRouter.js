var express = require("express");
var router = express.Router();
const uploadFile = require('../middlewares/multer')

//Get home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});


//localhost:5000/home/uploadFile
router.post('/uploadFile', uploadFile(), (req, res) => {
  console.log(req.file);
  res.send('ok');
});

module.exports = router;
