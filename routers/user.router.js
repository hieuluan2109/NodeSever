const express = require('express');
const router = express.Router();
const passport = require('passport');
const {validate} = require('../controllers/admin_validator');
const {UserController} = require('../controllers/index.controller');
router.get(
    '/update-request',
    UserController.admin_get_edit_profile_user
);
router.post(
    '/update-request/accept',
    UserController.admin_handle_edit_profile_request_accept
);
router.post(
    '/update-request/denined',
    UserController.admin_handle_edit_profile_request_denied
);
router.post(
    '/add/teacher',
    passport.authenticate('jwt', {session: false}),
    validate.validateSignUpTecher(),
    UserController.admin_add_teacher
);
router.post(
    '/add/student',
    passport.authenticate('jwt', {session: false}),
    validate.validateSignUpStudent(),
    UserController.admin_add_student
);
router.get(
    '/detail/:user&:id',
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
        const {user, id} = req.params;
        user == 'teacher'
            ? UserController.admin_get_teacher_detail(res, next, id)
            : UserController.admin_get_student_detail(res, next, id)
    },
);
router.get(
    '/list/teacher',
    passport.authenticate('jwt', {session: false}),
    UserController.admin_get_teacher_list
);
router.get(
    '/list/student',
    passport.authenticate('jwt', {session: false}),
    UserController.admin_get_student_list
);
router.post(
    '/update',
    passport.authenticate('jwt', {session: false}),
    UserController.admin_update_user
);
router.get(
    '/update/detail',
    passport.authenticate('jwt', {session: false}),
    UserController.admin_get_edit_profile_user,
);
router.post(
    '/add/student/file',
    passport.authenticate('jwt', {session: false}),
    UserController.admin_add_students_by_file
);
router.post(
    '/add/teacher/file',
    passport.authenticate('jwt', {session: false}),
    UserController.admin_add_teachers_by_file
);
module.exports = router;