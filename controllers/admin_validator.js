const {check} = require('express-validator');
const {regex} = require('./admin_function');
const moment = require('moment');
let validateLogin = () => {
    return [
        check('email', 'email không được bỏ trống')
            .not()
            .isEmpty(),
        check('email', 'email không hợp lệ').isEmail(),
        check('password', 'password không được bỏ trống')
            .not()
            .isEmpty(),
        check('password', 'password phải từ 6-24 kí tự').isLength({min: 6, max: 24})
    ];
};
let validateSignUpTecher = () => {
    return [
        check('ten', 'Tên không được bỏ trống')
            .not()
            .isEmpty(),
        check('ten', 'Tên không hợp lệ').matches(regex.ho_ten),
        check('ho', 'Họ không được để trống')
            .not()
            .isEmpty(),
        check('ho', 'Họ không hợp lệ').matches(regex.ho_ten),
        check('email', 'email không hợp lệ').isEmail(),
        check('email', 'email không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh', 'Ngày sinh không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh').custom((value, {req, loc, path}) => {
            const date = new Date();
            console.log(value < moment(date).format('YYYY-MM-DD'))
            if ( value > moment(date).format('YYYY-MM-DD')) {
                throw new Error('Ngày sinh không hợp lệ');
            } else {return value; }
        }),
        check('ngay_sinh', 'Ngày sinh không hợp lệ').matches(regex().ngay_sinh),
        check('password', 'password không được bỏ trống')
            .not()
            .isEmpty(),
        check('password', 'password phải từ 6-24 kí tự').isLength({min: 6, max: 24})
    ];
};
let validateSignUpStudent = () => {
    return [
        check('ma_sv', 'Mã sinh viên không được để trống')
            .not()
            .isEmpty(),
        check('ma_sv', 'Mã sinh viên không hợp lệ').matches(regex().massv),
        check('ten', 'Tên không được bỏ trống')
            .not()
            .isEmpty(),
        check('ten', 'Tên không hợp lệ').matches(regex.ho_ten),
        check('ho', 'Họ không được để trống')
            .not()
            .isEmpty(),
        check('ho', 'Họ không hợp lệ').matches(regex.ho_ten),
        check('email', 'email không hợp lệ').isEmail(),
        check('email', 'email không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh', 'Ngày sinh không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh').custom((value, {req, loc, path}) => {
            const date = new Date();
            console.log(value < moment(date).format('YYYY-MM-DD'))
            if ( value > moment(date).format('YYYY-MM-DD')) {
                throw new Error('Ngày sinh không hợp lệ');
            } else {return value; }
        }),
        check('ngay_sinh', 'Ngày sinh không hợp lệ').matches(regex.ngay_sinh),
        check('password', 'password không được bỏ trống')
            .not()
            .isEmpty(),
        check('password', ' password phải từ 6-24 kí tự').isLength({min: 6, max: 24})
    ];
};
let validateChangePassword = (req, res, next) => {
    return [
        check('password', 'password cũ không được bỏ trống')
            .not()
            .isEmpty(),
        check('password1', 'password mới không được bỏ trống')
            .not()
            .isEmpty(),
        check('password1', 'password mới phải từ 6-24 kí tự').isLength(
            {min: 6, max: 24}
        ),
        check('password1').custom((value, {req, loc, path}) => {
            if (value == req.body.password) {
                throw new Error('Mật khẩu mới không được giống mật khẩu cũ');
            } else {
                return value;
            }
        }),
        check('password2').custom((value, {req, loc, path}) => {
            if (value !== req.body.password1) {
                throw new Error('Nhập lại mật khẩu mới không chính xác');
            } else {
                return value;
            }
        })
    ];
};
let validateCreateChoiceQuestion = () => {
    return [
        check('noi_dung')
            .not()
            .isEmpty()
            .withMessage('Nội dung không được để trống')
            .isLength({min: 4})
            .withMessage('Nội dung câu hỏi quá ngắn'),
        check('dap_an')
            .not()
            .isEmpty()
            .withMessage('Đáp án không được bỏ trống'),
        check('lua_chon')
            .not()
            .isEmpty()
            .withMessage('Lựa chọn không được để trống'),
        check('danh_muc')
            .not()
            .isEmpty()
            .withMessage('Danh mục không được để trống'),
    ];
};
let validateCreateAssayQuestion = () => {
    return [
        check('noi_dung')
            .not()
            .isEmpty()
            .withMessage('Nội dung không được để trống')
            .isLength({min: 5})
            .withMessage('Nội dung câu hỏi quá ngắn'),
        check('danh_muc')
            .not()
            .isEmpty()
            .withMessage('Lựa chọn không được để trống'),
    ]
};
let validateCreateCategory = () => {
    return [
        check('tieu_de')
            .not()
            .isEmpty()
            .withMessage('Tiêu đề không được để trống'),
        check('mo_ta')
            .not()
            .isEmpty()
            .withMessage('Mô tả không được để trống')
    ];
};
let validateUpdateAdminProfile = () => {
    return [
        check('ten', 'Tên không được bỏ trống')
        .not()
        .isEmpty(),
        check('ten', 'Tên không hợp lệ').matches(regex.ho_ten),
        check('ho', 'Họ không được để trống')
            .not()
            .isEmpty(),
        check('ho', 'Họ không hợp lệ').matches(regex.ho_ten),
        check('ngay_sinh').custom((value, {req, loc, path}) => {
            const date = new Date();
            console.log(value < moment(date).format('YYYY-MM-DD'))
            if ( value > moment(date).format('YYYY-MM-DD')) {
                throw new Error('Ngày sinh không hợp lệ');
            } else {return value; }
        }),
        check('ngay_sinh', 'Ngày sinh không hợp lệ').matches(regex.ngay_sinh),
    ];
};
let validate = {
    validateCreateCategory: validateCreateCategory,
    validateLogin: validateLogin,
    validateSignUpTecher: validateSignUpTecher,
    validateChangePassword: validateChangePassword,
    validateSignUpStudent: validateSignUpStudent,
    validateCreateChoiceQuestion: validateCreateChoiceQuestion,
    validateCreateAssayQuestion: validateCreateAssayQuestion,
    validateUpdateAdminProfile: validateUpdateAdminProfile,
};
module.exports = {
    validate
};