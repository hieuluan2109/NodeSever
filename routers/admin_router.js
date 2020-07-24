const express = require('express');
const router = express.Router();
const passport = require('passport');
const {validate} = require('../controllers/admin_validator');
const Controller = require('../controllers/index.controller');
//login
router.post(
    '/login',
    validate.validateLogin(),
    Controller.LoginController.admin_login
);
router.get(
    '/logout',
    passport.authenticate('jwt', {session: false}),
    Controller.LoginController.admin_logout
);
router.get('/forgot', Controller.AdminController.admin_forgot_password)
// dashboard router.get(     '/dashboard',
// Controller.DashBoard.get_dashboard ); 
//users
router.post(
    '/user/add/teacher',
    passport.authenticate('jwt', {session: false}),
    validate.validateSignUpTecher(),
    Controller.UserController.admin_add_teacher
);
router.post(
    '/user/add/student',
    passport.authenticate('jwt', {session: false}),
    validate.validateSignUpStudent(),
    Controller.UserController.admin_add_student
);
router.get(
    '/user/detail/:user&:id',
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
        const {user, id} = req.params;
        user == 'teacher'
            ? Controller.UserController.admin_get_teacher_detail(res, next, id)
            : Controller.UserController.admin_get_student_detail(res, next, id)
    },
);
router.get(
    '/user/list/teacher',
    passport.authenticate('jwt', {session: false}),
    Controller.UserController.admin_get_teacher_list
);
router.get(
    '/user/list/student',
    passport.authenticate('jwt', {session: false}),
    Controller.UserController.admin_get_student_list
);
router.get(
    '/user/update',
    passport.authenticate('jwt', {session: false}),
    Controller.UserController.admin_update_user
)
//admin info
router.post(
    '/changepassword',
    passport.authenticate('jwt', {session: false}),
    validate.validateChangePassword(),
    Controller.AdminController.admin_change_password
);
router.get(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    Controller.AdminController.admin_get_profile
);
router.post(
    '/profile/update',
    passport.authenticate('jwt', {session: false}),
    Controller.AdminController.admin_update_profile
);
//category
router.get(
    '/category/list',
    passport.authenticate('jwt', {session: false}),
    Controller.CategoryController.admin_get_category_list
);
router.get(
    '/category/detail/:id',
    passport.authenticate('jwt', {session: false}),
    Controller.CategoryController.admin_get_detail_category
);
router.post(
    '/category/create',
    passport.authenticate('jwt', {session: false}),
    validate.validateCreateCategory(),
    Controller.CategoryController.admin_create_category
)
router.post(
    '/category/update',
    passport.authenticate('jwt', {session: false}),
    validate.validateCreateCategory,
    Controller.CategoryController.admin_update_category
)
//question
router.get(
    '/question/list/',
    passport.authenticate('jwt', {session: false}),
    Controller.QuestionController.admin_get_question_list
);
router.get(
    '/question/detail',
    passport.authenticate('jwt', {session: false}),
    Controller.QuestionController.admin_get_question_detail
);
router.post(
    '/question/create/choice',
    passport.authenticate('jwt', {session: false}),
    validate.validateCreateChoiceQuestion(),
    Controller.QuestionController.admin_create_question_choice
);
router.post(
    '/question/create/assay',
    passport.authenticate('jwt', {session: false}),
    validate.validateCreateAssayQuestion(),
    Controller.QuestionController.admin_create_question_assay
);
//class
router.get(
    '/class/list',
    passport.authenticate('jwt', {session: false}),
    Controller.ClassController.admin_get_class_list
);
router.get(
    '/class/detail/:id',
    passport.authenticate('jwt', {session: false}),
    Controller.ClassController.admin_get_class_detail
);
module.exports = router;