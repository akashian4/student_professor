const express = require('express');
const router = express.Router({ mergeParams: true });
const Service = require('../Service/services');

/* User Registration. */
router.post('/register', Service.register);

/* User Login. */
router.post('/login', Service.login);

/* User command. */
router.post('/command', Service.command);

/* User answer. */
router.post('/answer/:commandid', Service.answer);

/* get user. */
router.get('/user', Service.getuser);

module.exports = router;
