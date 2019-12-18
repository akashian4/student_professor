const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var db = mongoose.connect("mongodb://localhost:27017/student_prpfessor", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

require('../Models/User');

module.exports.db = db;