const {hashPassWord, checkPassword, customDatetime} = require('./admin_function');
const {NguoidungSchema} = require('../model/index.schema');
const {validationResult} = require('express-validator');
const nodemailer = require('nodemailer');
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
        const [{ ho, ten, ngay_sinh, anh_dai_dien }, option] = [ req.body, { new: true, useFindAndModify: false }];
        const update = !anh_dai_dien ? { ho, ten, ngay_sinh } : {anh_dai_dien};
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
        var transporter =  nodemailer.createTransport({ // config mail server
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'hieuluan.2109@gmail.com',
                pass: 'Cookcie00999'
            }
        });
        let content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                <span style="color: black">Đây là mail test</span>
            </div>
        </div> `; let info;
        transporter.sendMail({
            from: 'Navilear',
            to: 'kesanbauvat99@gmail.com',
            subject: 'Quên mật khẩu',
            html: content
        }, function (err, info){
            if (err) console.log(err)
            else 
                console.log(info) 
        })
    },
};