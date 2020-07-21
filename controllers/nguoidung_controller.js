const {validationResult} = require('express-validator');
const {SinhvienSchema, NguoidungSchema} = require('../model/Schema');
const {capitalizeFirstLetter, hashPassWord} = require('./admin_function');
const moment = require('moment');
module.exports = {
    admin_add_teacher: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        const check = await NguoidungSchema
            .findOne({email: data.email})
            .count((count) => count)
            .catch(err => 0);
        if (check) 
            return res.status(400).json({'success': false, 'errors': 'Email đã tồn tại'})
        else {
            const gv = new NguoidungSchema({
                'ho': capitalizeFirstLetter(data.ho),
                'ten': capitalizeFirstLetter(data.ten),
                'email': data.email,
                'ngay_sinh': moment(data.ngay_sinh).format('YYYY-MM-DD'),
                'mat_khau': await hashPassWord(data.password),
                'nguoi_tao_id': req.user._id
            })
            gv.save(function (err, doc) {
                err ? res.status(400) .json({'success': false, 'errors': err})
                    : res.status(200).json({'success': true, 'msg': 'Thêm giáo viên thành công'})
            })
        }
    },
    admin_add_student: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        const check = await SinhvienSchema
            .find({$or: [{ email: data.email }, { ma_sv: data.ma_sv }]
            })
            .count((count) => count)
            .catch(err => 0);
        if (check) 
            return res.status(400) .json({'success': false, 'errors': 'Email hoặc mã số sinh viên đã tồn tại'})
        else {
            const sv = new SinhvienSchema({
                'ma_sv': data.ma_sv,
                'ho': capitalizeFirstLetter(data.ho),
                'ten': capitalizeFirstLetter(data.ten),
                'email': data.email,
                'ngay_sinh': moment(data.ngay_sinh).format('YYYY-MM-DD'),
                'mat_khau': await hashPassWord(data.password),
                'nguoi_tao_id': req.user._id
            })
            sv.save(function (err, doc) {
                err ? res.status(400).json({'success': false, 'errors': err})
                    : res.status(200).json({'success': true, 'msg': 'Thêm sinh viên thành công'})
            })
        }
    },
    admin_get_teacher_list: async function (req, res) {
        let perPage = 10;
        let page = req.query.page || 1;
        await NguoidungSchema
            .find({loai: false})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, data) => {
                NguoidungSchema.countDocuments(
                (err, count) => {
                    err ? res.status(400).json({'success': false, 'errors': err})
                        : res.status(200).json({
                            success: true, data,
                            current: page,
                            pages: Math.ceil(count / perPage)
                    });
                });
            });
    },
    admin_get_student_list: async function (req, res) {
        let perPage = 10;
        let page = req.query.page || 1;
        await SinhvienSchema
            .find({}, ['ho', 'ten', '_id', 'email', 'ngay_sinh'])
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, data) => {
                // data =  data.map( function(a){
                //     const {ngay_sinh} = a;
                //     return {...a, ngay_sinh: moment(ngay_sinh).format('YYYY-MM-DD')}
                // })
                //     console.log(data)
                SinhvienSchema.countDocuments(
                (err, count) => {
                    err ? res.status(400).json({'success': false, 'errors': err})
                        : res.status(200).json({
                            success: true,
                            data,
                            current: page,
                            pages: Math.ceil(count / perPage)
                    });
                });
            });
    },
    admin_get_teacher_detail: async function (res, next, id) {
        await NguoidungSchema
            .findOne({ '_id': id, 'loai': false}, [
                'ho',
                'ten',
                '_id',
                'email',
                'anh_dai_dien',
                'nguoi_tao_id',
                'createdAt',
                'updatedAt' ])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                if (err) 
                    next(err);
                (!result || result.length < 1)
                ? res.status(400).json({'success': false, 'erros': 'Lỗi không tìm thấy!'})
                : res.status(200).json({'success': true, 'data': result})
            })
    },
    admin_get_student_detail: async function (res, next, id) {
        await SinhvienSchema
            .findOne({ '_id': id }, [
                'ma_sv',
                'ds_lop_hoc',
                'ho',
                'ten',
                '_id',
                'email',
                'anh_dai_dien',
                'nguoi_tao_id',
                'createdAt',
                'updatedAt'
            ])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate({path: 'ds_lop_hoc', model: 'LopHoc'})
            .exec((err, result) => {
                if (err) 
                    next(err);
                (!result || result.length < 1) 
                    ? res.status(400).json({'success': false, 'erros': 'Lỗi không tìm thấy!'})
                    : res.status(200).json({'success': true, 'data': result})
            })
    }
};
