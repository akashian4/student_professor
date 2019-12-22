
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
// const cors = require('cors');
// var User = require('./Models/User');
const {authenticate}=require('./authenticate/authenticate');


const mongoose = require('./db/mongoose');
const Route = require('./Routes/Route');
var cors = require('cors')

app.use(cors()) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// app.use(cors());

app.use((err, req, res, next) => {
  return res.send({
    "statusCode": util.statusCode.ONE,
    "statusMessage": util.statusMessage.SOMETHING_WRONG
  });
});

app.use('/auth', Route);
app.use('/api',authenticate, Route);


server.listen(3000, () => {
  console.log('app listening on port: 3000');
});
