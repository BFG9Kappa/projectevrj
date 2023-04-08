const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
var session = require("express-session");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

// Rutes
var indexRouter = require("./routes/indexRouter");
var authRouter = require("./routes/authRouter");
var horariRouter = require("./routes/horariRouter");
var baixesmediquesRouter = require("./routes/baixesmediquesRouter");
var absnoprevistesRouter = require("./routes/absnoprevistesRouter");
var absprevistesRouter = require("./routes/absprevistesRouter");
var sortidescurricularsRouter = require("./routes/sortidescurricularsRouter");

dotenv.config();
const port = process.env.PORT || 5000;

// Conexio a base de dades
const mongoose = require("mongoose");
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Paquete para las fechas
app.locals.moment = require("moment");

// Ruta de les vistes
app.set("views", path.join(__dirname, "views"));
// Selecciona motor de plantilles EJS
app.set("view engine", "ejs");
// Per pasar dades de formulari
app.use(express.urlencoded({ extended: true }));
// Per imatges, css, etc.
app.use(express.static(path.join(__dirname + "/public")));

// Vista default
app.get("/", function (req, res) {
	res.render("home");
});

app.get("/test", (req, res) => {
	res.send("Prova de servidor");
});

const server = app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

// Set up session
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		name: "M12",
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 },
	})
);

app.use(function (req, res, next) {
	if (req.session.data) {
		res.locals.userId = req.session.data.userId;
		res.locals.fullname = req.session.data.fullname;
		res.locals.role = req.session.data.role;
		console.log(req.session.data);
	}
	next();
});

app.use("/home", indexRouter);
app.use("/auth", authRouter);
app.use("/horaris", horariRouter);
app.use("/baixesmediques", baixesmediquesRouter);
app.use("/absnoprevistes", absnoprevistesRouter);
app.use("/absprevistes", absprevistesRouter);
app.use("/sortidescurriculars", sortidescurricularsRouter);

module.exports = app;
