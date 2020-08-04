const {hashPassWord, checkPassword, customDatetime, sendForgotPasswordMail, makeCode} = require('./admin_function');
const {NguoidungSchema, QuenMatKhau} = require('../model/index.schema');
const {validationResult} = require('express-validator');
const moment = require('moment');
module.exports = {
    admin_change_password: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({'success': false, 'errors': errors.array()})
        };
        const [_id,{password, password1 }, option ] = [ req.user ,req.body, { new: true, useFindAndModify: false }]
        await NguoidungSchema
            .findOne(_id)
            .exec( async (err, data) =>{
                if( !checkPassword(password, data.mat_khau) ) { 
                    res.status(400).json({'success': false, 'errors': 'Mật khẩu cũ không đúng'}) } 
                else {
                const update = { mat_khau: await hashPassWord(password1) };
                NguoidungSchema.findByIdAndUpdate(_id, { $set: update }, option, function (err, updated) { // need some attention
                    if(err || !updated)
                        res.status(400).json({'success': false, 'errors': 'Lỗi không xác định'}) 
                    else res.status(200).json({'success': true, 'msg': 'Chỉnh sửa mật khẩu thành công', 'data': updated}) 
                })}
            })
    },
    admin_update_profile: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        };
        const [{ ho, ten, ngay_sinh, anh_dai_dien }, option] = [ req.body, { new: true, useFindAndModify: false }];
        const update = !anh_dai_dien ? { 'ho': ho, 'ten': ten, 'ngay_sinh': ngay_sinh } : {'anh_dai_dien': anh_dai_dien};
        NguoidungSchema.findByIdAndUpdate(req.user._id, {
            $set: update
        }, option, function (err, updated) {
            err ? res.status(400).json({'success': err, 'errors': 'Lỗi không xác định'}) : res.status(200).json({'success': true, 'msg': 'Cập nhật thành công', 'data':updated})
        })
    },
    admin_get_profile: async function (req, res) {
        await NguoidungSchema
            .findOne({_id: req.user._id},['_id', 'ho', 'ten', 'anh_dai_dien', 'email', 'ngay_sinh', 'loai'])
            .exec((err, user) => {
                if (err) 
                    return res.status(200).json({'success': false, 'errors': err})
                else {
                    let data = user.toObject();
                    delete data.ngay_sinh;
                    data.ngay_sinh = customDatetime(user.ngay_sinh);
                    return res.status(200).json({'success': true, 'data': data})
                }
            });
    },
    admin_forgot_password: async function(req, res, next) {
        const {email} = req.body;
        await NguoidungSchema
            .findOne({'email': email},)
            .exec( async (err, data)=>{
                if (err || !data)
                    return res.status(400).json({'success': false, 'msg': 'Không tồn tại email '+email})
                else {
                    const code = await makeCode();
                    sendForgotPasswordMail(email, code, data.ho+' ' + data.ten)
                    const newRC = new QuenMatKhau({
                        code: code,
                        email: email
                    });
                    newRC.save()
                    .then(s=> console.log(s))
                    .catch(err => console.log(err));
                    res.status(200).json({'success': true})
                };
            })
    },
    admin_change_password_with_code: async function (req, res) {
        const [{code}, {password, password1}, option ] = [ req.query ,req.body, { new: true, useFindAndModify: false }] ;
        const update = {mat_khau: await hashPassWord(password)}
        QuenMatKhau.findOneAndUpdate({'code': code, 'expire' : {$gt : Date.now()}},{ $set: {expire: -expire} },option)
        .then(user => {
            NguoidungSchema.findOneAndUpdate({email: user.email}, { $set: update }, option, function (err, updated) { // need some attention
                if(err || !updated)
                    res.status(400).json({'success': false, 'errors': 'Lỗi không xác định'}) 
                else res.status(200).json({'success': true, 'msg': 'Chỉnh sửa mật khẩu thành công', 'data': updated}) 
            })}
        )
        .catch(err => res.status(400).json({success: false, msg: 'Mã code đã hết hạn'}))
    },
};