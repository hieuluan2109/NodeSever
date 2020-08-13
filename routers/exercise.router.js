const express = require('express');
const router = express.Router();
const passport = require('passport');
const {Exercise} = require('../controllers/index.controller');
router.get(
    '/list',
    passport.authenticate('jwt', {session: false}),
    Exercise.admin_get_exercise_list
);
router.get(
    '/belong-class',
    passport.authenticate('jwt', {session: false}),
    Exercise.admin_get_exercise_belong_class
);
module.exports = router