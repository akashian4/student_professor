var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');
// const _ = require('lodash');

var Schema = mongoose.Schema;
let UserSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    default: null,
    required: true
  },
  lastname: {
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
    type: String
    // minlength: 11,
    // maxlength: 11
  },
  is_student: {
    type: Boolean
    // minlength: 11,
    // maxlength: 11
  },
  token: {
    type: String,
    trim: true
  },
  command: [
    {
      title: {
        type: String,
        required: true,
        maxlength: 20
      },
      text_command: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      like: {
        type: Number,
        default: 0
      },
      answers: [
        {
          name: {
            type: String,
            required: true
          },
          text_answer: {
            type: String,
            required: true
          },
          date: {
            type: String,
            required: true
          }
        }
      ]
    }
  ]
});

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'shams');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    username: decoded.username,
    token: token
  });
};

// UserSchema.methods.toJSON = function () {
//   let user = this;
//   let userObject = user.toObject();
//   return _.pick(userObject, ['_id', 'firstname','lastname','phone','token', 'email']);
// }

// UserSchema.methods.removetoken = function(token) {
//   let user = this;

//   return user.update({
//    token:""
//   });
// };

let Models = mongoose.model('User', UserSchema);

module.exports = { Models };
