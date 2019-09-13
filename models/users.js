var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
     email: { type: String, required: true },
     password: { type: String, required: true },
     isAdmin: { type: Boolean , default: false }
});

module.exports = mongoose.model('Users', UserSchema);

