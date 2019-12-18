var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let User = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: null,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    default: null
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    trim: true,
    default: null,
    required: true
  },
  password: {
    type: String,
    trim: true,
    select: false,
    default: null,
    required: true
  },
  phone: {
    type: String,
    // minlength: 11,
    // maxlength: 11
  },
  is_student: {
    type: Boolean,
    // minlength: 11,
    // maxlength: 11
  }
});

module.exports = mongoose.model('User', User);