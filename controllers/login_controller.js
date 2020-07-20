const {validationResult} = require('express-validator');
const passport = require('passport');
module.exports = {
    admin_login: async function (req, res, next) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res
                    .status(400)
                    .json({'success': false, 'errors': 'Email hoặc mật khẩu không đúng'});
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                const token = sign_token(user);
                return res
                    .status(200)
                    .json({'success': true, 'msg': 'Login successful', 'token': token});
            });
        })(req, res, next);
    },
    admin_logout: function (req, res) {
        req.logout()
        res
            .status(200)
            .json({'success': true, 'msg': 'Đăng xuất thành công'});
    }
}