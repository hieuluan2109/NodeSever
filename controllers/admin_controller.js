const {hashPassWord, checkPassword} = require('./admin_function');
const {NguoidungSchema} = require('../model/Schema');
const {validationResult} = require('express-validator');
module.exports = {
    admin_change_password: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return resstatus(400).json({'success': false, 'errors': errors.array()})
        }
        const [{ _id, password, password1 }, option ] = [ req.body, { new: true, useFindAndModify: false }]
        const check = await NguoidungSchema
            .findOne(_id)
            .then(user => checkPassword(password, user.mat_khau))
            .catch(err => false); // Focus on here
        if (!check) {
            return res.status(400).json({'success': false, 'errors': 'Mật khẩu cũ không đúng'})
        } else {
            const update = {
                mat_khau: await hashPassWord(password1)
            };
            NguoidungSchema.findByIdAndUpdate(_id, {
                $set: update
            }, option, function (err, updated) { // need some attention
                err ? res.status(400).json({'success': false, 'errors': 'Lỗi không xác định'}) : res.status(200).json({'success': true, 'msg': 'Chỉnh sửa mật khẩu thành công'})
            })
        }
    },
    admin_update_profile: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        };
        const [{ data }, option ] = [ req.body, { new: true, useFindAndModify: false }];
        const update = {
            mat_khau: hashPassWord()
        };
        NguoidungSchema.findByIdAndUpdate(_id, {
            $set: update
        }, option, function (err, updated) {
            err ? res.status(400).json({'success': false, 'errors': 'Lỗi không xác định'}) : res.status(200).json({'success': true, 'msg': 'Cập nhật thành công'})
        })
    },
    admin_get_profile: async function (req, res) {
        await NguoidungSchema
            .findOne({_id: req.user._id})
            .exec((err, user) => {
                if (err) 
                    return res.status(200).json({'success': false, 'errors': err})
                else {
                    let data = user.toObject();
                    delete data.mat_khau;
                    return res.status(200).json({'success': true, 'data': data})
                }
            });
    }
};