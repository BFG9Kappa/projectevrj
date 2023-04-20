/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var crypto = require('crypto');

var UserSchema = new Schema({
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
});

// Export model
module.exports = mongoose.model('User', UserSchema);*/
