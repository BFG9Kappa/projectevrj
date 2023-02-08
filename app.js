const express = require("express");
const path = require('path');
const app = express();
const dotenv = require('dotenv');

// Rutes
var indexRouter = require('./routes/indexRouter');
var loginRouter = require('./routes/loginRouter');
var usuarisRouter = require('./routes/usuarisRouter');
var horariRouter = require('./routes/horariRouter');
var baixesmediquesRouter = require('./routes/baixesmediquesRouter');
var absnoprevistesRouter = require('./routes/absnoprevistesRouter');
var absprevistesRouter = require('./routes/absprevistesRouter');
var sortidescurricularsRouter = require('./routes/sortidescurricularsRouter');


dotenv.config();
const port = process.env.PORT || 5003;


// Conexio a base de dades
const mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Ruta de les vistes
app.set('views',path.join(__dirname,'views'));
// Selecciona motor de plantilles EJS
app.set('view engine', 'ejs');
// Per pasar dades de formulari
app.use(express.urlencoded({ extended: true }));
// Per imatges, css, etc.
app.use(express.static(path.join(__dirname + '/public')));


// Vista default
app.get('/', function(req, res) {  
  res.render('home');
});


const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.use('/home', indexRouter);
app.use('/login', loginRouter);
app.use('/usuaris', usuarisRouter);
app.use('/horaris', horariRouter);
app.use('/baixesmediques', baixesmediquesRouter);
app.use('/absnoprevistes', absnoprevistesRouter);
app.use('/absprevistes', absprevistesRouter);
app.use('/sortidescurriculars', sortidescurricularsRouter);


module.exports = app;