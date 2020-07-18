const express = require('express');
const router = express.Router();
const passport = require('passport');
const AdminController = require('../controllers/admin_controller');
const {validate} = require('../controllers/admin_validator');
router.post(
    '/login',
    validate.validateLogin(),
    AdminController.admin_login_post
);
router.get(
    '/logout',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_logout
);
// users
router.post(
    '/qlnguoidung/them/gv',
    passport.authenticate('jwt', {session: false}),
    validate.validateSignUpTecher(),
    AdminController.admin_add_teacher
);
router.post(
    '/qlnguoidung/them/sv',
    passport.authenticate('jwt', {session: false}),
    validate.validateSignUpStudent(),
    AdminController.admin_add_student
);
router.get(
    '/user/detail/:user&:id',
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
        const {user, id} = req.params;
        user == 'teacher'
            ? AdminController.admin_get_teacher_detail(res, next, id)
            : AdminController.admin_get_student_detail(res, next, id)
    },
);
router.get(
    '/user/list/teacher',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_teacher_list
);
router.get(
    '/user/list/student',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_student_list
);
//admin info
router.post(
    '/changepassword',
    passport.authenticate('jwt', {session: false}),
    validate.validateChangePassword(),
    AdminController.admin_change_password
);
// router.post(
//     '/profile/edit',
//     passport.authenticate('jwt', {session: false}),
//     AdminController.get_profile_admin
// );
router.get(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_profile
);
//category
router.get(
    '/category/list',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_category_list
);
router.get(
    '/category/detail/:id',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_detail_category
);
//question
router.get(
    '/question/list',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_question_list
);
router.get(
    '/question/detail/:id',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_question_detail
);
router.post(
    '/question/create',
    passport.authenticate('jwt', {session: false}),
    validate.validateCreateQuestion(),
    AdminController.admin_create_question
);
//class
router.get(
    '/class/list',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_class_list
);
router.get(
    '/class/detail/:id',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_question_detail
);
module.exports = router;