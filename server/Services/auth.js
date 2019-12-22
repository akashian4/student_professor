const User_CRUD = require('../db/User_CRUD');

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
          firstname: req.body.firstname ? req.body.firstname : '',
          lastname: req.body.lastname ? req.body.lastname : '',
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: MD5(MD5(req.body.password)),
          is_student: req.body.is_student
        };

        const addUser = await User_CRUD.createUser(userData);
        if (addUser) {
          console.log(addUser.token);
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
          res.status(200).json({
            message: 'Logged in successfully!',
            result: checkPassword[0],
            token: 'dummy-jwt-token-for-now'
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

module.exports = {
  register: register,
  login: login
};
