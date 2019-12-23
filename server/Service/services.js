const User_CRUD = require('../db/User_CRUD');
var { Models } = require('../Models/User');
const persianDate = require('persian-date');

const MD5 = require('md5');

/* API to register new user */
let register = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' });
  } else {
    try {
      let user = {
        username: req.body.username
      };
      const checkUsername = await User_CRUD.getUsers(user);
      if (checkUsername && checkUsername.length == 1) {
        res.status(401).json({ message: 'username already registered' });
      } else {
        let userData = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: MD5(MD5(req.body.password)),
          is_student: req.body.is_student
        };

        const addUser = await User_CRUD.createUser(userData);
        if (addUser) {
          res.header('x-auth', addUser.token);
          res.status(200).json({ message: 'User registered successfully!' });
        } else {
          res.status(403).json({ message: 'Something went wrong 2' });
        }
      }
    } catch (error) {
      res.status(404).json({ message: 'Something went wrong 3', error: error });
    }
  }
};

/* API to login user */
let login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' });
  } else {
    try {
      let user = {
        username: req.body.username
      };
      const checkUsername = await User_CRUD.getUsers(user);

      if (checkUsername && checkUsername.length > 0) {
        let user = {
          username: req.body.username,
          password: MD5(MD5(req.body.password))
        };
        const checkPassword = await User_CRUD.getUsers(user);
        if (checkPassword && checkPassword.length == 1) {
          res.header('x-auth', checkPassword[0].token);
          res.status(200).json({
            message: 'Logged in successfully!',
            result: checkPassword[0],
            token:checkPassword[0].token
          });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(401).json({ message: 'Username not exist!' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Something went wrong', error: error });
    }
  }
};

/* API to post command */
let command = async (req, res) => {
  if (!req.body.title || !req.body.text_command) {
    res.status(401).json({ message: 'Parameters are missing' });
  } else {
    try {
      persianDate.toLocale('en');
      var date = new persianDate().format('YYYY/M/DD');
      let user = await Models.findOneAndUpdate(
        {
          _id: req.user._id
        },
        {
          $push: {
            command: {
              title: req.body.title,
              text_command: req.body.text_command,
              date: date
            }
          }
        }
      );
      if (!user) {
        return res.status(404).json({
          massage: 'user not found'
        });
      }
      res.status(200).json({
        massage: 'command has been saved'
      });
    } catch (e) {
      res.status(400).json({
        massage: `somthing went wrong!.${e}`
      });
    }
  }
};

/* API to post answer */
let answer = async (req, res) => {
  let commandid = req.params.commandid;

  if (!commandid) {
    res.status(401).json({ message: 'Parameters are missing' });
  } else {
    try {
      persianDate.toLocale('en');
      var date = new persianDate().format('YYYY/M/DD');
      let user = await Models.findOneAndUpdate(
        {
          'command._id': commandid
        },
        {
          $push: {
            'command.$.answers': {
              name: req.user.firstname +" "+ req.user.lastname,
              text_answer: req.body.text_answer,
              date: date
            }
          }
        }
      );

      if (!user) {
        return res.status(404).json({
          Error: 'user not found'
        });
      }
      res.status(200).json({
        Massage: 'answer has been saved'
      });
    } catch (e) {
      res.status(400).json({
        Error: `somthing went wrong!.${e}`
      });
    }
  }
};

/* API to get user */
let getuser = async (req, res) => {
  try {
    let user = await Models.findOne(
      {
        _id: req.user._id
      },
      (err, res) => {
        if(err) console.log(err);
      }
    );

    if (!user) {
      return res.status(404).json({
        Error: 'user not found'
      });
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({
      Error: `somthing went wrong!.${e}`
    });
  }
};

module.exports = {
  register: register,
  login: login,
  command: command,
  answer: answer,
  getuser: getuser
};
