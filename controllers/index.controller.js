const LoginController = require('./login.controller');
const AdminController = require('./admin.controller');
const QuestionController = require('./cauhoi.controller');
const UserController = require('./nguoidung.controller');
const CategoryController = require('./danhmuc.controller');
const ClassController = require('./lop.controller');
const Stats = require('./stats.controller')
const Test = require('./baithi.controller')
module.exports = {
    LoginController,
    AdminController,
    QuestionController,
    UserController,
    CategoryController,
    ClassController,
    Stats,
    Test
};