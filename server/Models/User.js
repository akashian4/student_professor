var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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
  }
});



// UserSchema.pre('save', next => {
//   let user = this;

//   if (user.isModified('password')) {
//     bcrypt.getSalt(10, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });


module.exports = mongoose.model('User', UserSchema);
