const express = require('express');
const router = express.Router();
const passport = require('passport');
const {validate} = require('../controllers/admin_validator');
const {AdminController} = require('../controllers/index.controller');
const example = require('../controllers/example');
// router.get('/get/image', 
//     example.listFiles
// );
router.get('/update123',
    AdminController.update_123
);
router.get('/notification',
    AdminController.admin_get_notification)
router.post(
    '/reset-password',
    AdminController.admin_change_password_with_code
);
router.post('/forgot-password',
    AdminController.admin_forgot_password
);
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
    passport.authenticate('jwt', {session: false}),
    validate.validateUpdateAdminProfile(),
    AdminController.admin_update_profile
);
module.exports = router;