const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
	{
		fullname: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			default: "user",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("users", UserScheme);
