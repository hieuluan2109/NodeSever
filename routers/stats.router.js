const express = require('express');
const router = express.Router();
const passport = require('passport');
const {Stats} = require('../controllers/index.controller');
router.get('/dashboard',Stats.admin_dashboard );
module.exports = router