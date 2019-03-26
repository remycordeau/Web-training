const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model('Admin', userSchema);
