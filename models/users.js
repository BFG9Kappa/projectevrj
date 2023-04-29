var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var crypto = require('crypto');

const UserScheme = new mongoose.Schema({
  fullname: { type: String, required: true },
  role: [{
    type: String,
    enum: [
      "administrador","director","cap de estudis","secretari","conserge","professor"
    ],
    default: "professor"
  }],
  email: { type: String, required: true },
  password: { type: String, required: true },
},
{
  timestamps: true,
  versionKey: false,
}
);

// Export model
module.exports = mongoose.model("users", UserScheme);
