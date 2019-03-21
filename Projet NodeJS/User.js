const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
	score: Number,
});

module.exports = mongoose.model('User', userSchema);
