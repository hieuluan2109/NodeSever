const express = require('express');
const router = express.Router();
const passport = require('passport');
const {Test} = require('../controllers/index.controller');
router.get('/list', Test.admin_get_test_list);

module.exports = router