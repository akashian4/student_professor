var { Models } = require('../Models/User');
let authenticate = function(req, res, next) {
  let token = req.header('x-auth');
  Models.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => {
      res.status(401).send();
    });
};

module.exports={
    authenticate
}