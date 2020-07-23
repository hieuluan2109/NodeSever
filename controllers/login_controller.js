const {validationResult} = require('express-validator');
const {sign_token} = require('./admin_function');
const passport = require('passport');
module.exports = {
    admin_login: async function (req, res, next) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
<<<<<<< Updated upstream
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
=======
            return res.status(400).json({'success': false, 'errors': errors.array()})
>>>>>>> Stashed changes
        }
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
<<<<<<< Updated upstream
                return res
                    .status(400)
                    .json({'success': false, 'errors': 'Email hoặc mật khẩu không đúng'});
=======
                return res.status(400).json({'success': false, 'errors': 'Email hoặc mật khẩu không đúng'});
>>>>>>> Stashed changes
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                const token = sign_token(user);
<<<<<<< Updated upstream
                return res
                    .status(200)
                    .json({'success': true, 'msg': 'Login successful', 'token': token});
=======
                return res.status(200).json({'success': true, 'msg': 'Login successful', 'token': token});
>>>>>>> Stashed changes
            });
        })(req, res, next);
    },
    admin_logout: function (req, res) {
        req.logout()
<<<<<<< Updated upstream
        res
            .status(200)
            .json({'success': true, 'msg': 'Đăng xuất thành công'});
=======
        res.status(200).json({'success': true, 'msg': 'Đăng xuất thành công'});
>>>>>>> Stashed changes
    }
}