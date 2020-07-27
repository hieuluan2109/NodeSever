const express = require('express');
const router = express.Router();
const passport = require('passport');
const {validate} = require('../controllers/admin_validator');
const {LoginController} = require('../controllers/index.controller');
router.post(
    '/login',
    validate.validateLogin(),
    LoginController.admin_login
);
router.get(
    '/logout',
    passport.authenticate('jwt', {session: false}),
    LoginController.admin_logout
);
module.exports = router;