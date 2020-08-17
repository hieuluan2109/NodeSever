const express = require('express');
const router = express.Router();
const passport = require('passport');
const {Stats} = require('../controllers/index.controller');
router.get('/dashboard',Stats.admin_dashboard );
router.get('/diem', Stats.admin_stats_point);
router.get('/top-sv', Stats.admin_get_stats_top_student)
router.get('/class-belong-teacher', Stats.amdin_get_class_belong_a_teacher);
module.exports = router