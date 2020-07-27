const express = require('express');
const router = express.Router();
const passport = require('passport');
const {validate} = require('../controllers/admin_validator');
const {QuestionController} = require('../controllers/index.controller');
router.get(
    '/list/',
    passport.authenticate('jwt', {session: false}),
    QuestionController.admin_get_question_list
);
router.get(
    '/detail',
    passport.authenticate('jwt', {session: false}),
    QuestionController.admin_get_question_detail
);
router.post(
    '/create/choice',
    passport.authenticate('jwt', {session: false}),
    validate.validateCreateChoiceQuestion(),
    QuestionController.admin_create_question_choice
);
router.post(
    '/create/assay',
    passport.authenticate('jwt', {session: false}),
    validate.validateCreateAssayQuestion(),
    QuestionController.admin_create_question_assay
);
module.exports = router;