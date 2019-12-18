var Models = require("../Models/User");

//read user
const getUsers =(user) =>
new Promise((resolve, reject) => {
  Models.find(user)
    .then(client => resolve(client))
    .catch(err => {reject(err);
      console.log(err);
   });
});

//create new user
const createUser = (user) =>
new Promise((resolve, reject) => {
  new Models(user)
    .save()
    .then(client => resolve(client))
    .catch(err => {reject(err);
       console.log(err);
    });
});

//update the user
// const updateUser = (criteria, dataToSet, options) =>
//   new Promise((resolve, reject) => {
//     options.lean = true;
//     options.new = true;
//     Models.findOneAndUpdate(criteria, dataToSet, options)
//       .then(client => resolve(client))
//       .catch(err => reject(err));
//   });

//delete user
// const deleteUser = (criteria) =>
//   new Promise((resolve, reject) => {
//     Models.findOneAndRemove(criteria)
//       .exec()
//       .then(client => resolve(client))
//       .catch(err => reject(err));
//   });


module.exports = {
//   updateUser: updateUser,
//   deleteUser: deleteUser,
createUser: createUser,
  getUsers: getUsers
};