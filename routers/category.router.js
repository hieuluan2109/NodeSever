const express = require('express');
const router = express.Router();
const passport = require('passport');
const {validate} = require('../controllers/admin_validator');
const {CategoryController} = require('../controllers/index.controller');
router.get(
    '/update/status',
    passport.authenticate('jwt', {session: false}),
    CategoryController.admin_set_status
);
router.get(
    '/list',
    passport.authenticate('jwt', {session: false}),
    CategoryController.admin_get_category_list
);
router.get(
    '/detail/:id',
    passport.authenticate('jwt', {session: false}),
    CategoryController.admin_get_detail_category
);
router.post(
    '/create',
    passport.authenticate('jwt', {session: false}),
    validate.validateCreateCategory(),
    CategoryController.admin_create_category
);
router.post(
    '/update/:id',
    passport.authenticate('jwt', {session: false}),
    validate.validateCreateCategory(),
    CategoryController.admin_update_category
);
module.exports = router;