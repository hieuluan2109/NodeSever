const express = require('express');
const router = express.Router();
const passport = require('passport');
const {validate} = require('../controllers/admin_validator');
const {AdminController} = require('../controllers/index.controller');
router.post(
    '/changepassword',
    passport.authenticate('jwt', {session: false}),
    validate.validateChangePassword(),
    AdminController.admin_change_password
);
router.get(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_profile
);
router.post(
    '/profile/update',
    validate.validateUpdateAdminProfile(),
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_update_profile
);
module.exports = router;