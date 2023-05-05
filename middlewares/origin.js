const checkOrigin = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ").pop();
		if (token === "123456") {
			next();
		} else {
			res.status(409);
			res.send({ error: "No estas autoritzat" });
		}
	} catch (e) {
		next();
	}
};

module.exports = checkOrigin;
