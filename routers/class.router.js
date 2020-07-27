const express = require('express');
const router = express.Router();
const passport = require('passport');
const {validate} = require('../controllers/admin_validator');
const {ClassController} = require('../controllers/index.controller');
router.get(
    '/list',
    passport.authenticate('jwt', {session: false}),
    ClassController.admin_get_class_list
);
router.get(
    '/detail/:id',
    passport.authenticate('jwt', {session: false}),
    ClassController.admin_get_class_detail
);
module.exports = router;