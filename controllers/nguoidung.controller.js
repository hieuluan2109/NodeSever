const {validationResult} = require('express-validator');
const {SinhvienSchema, NguoidungSchema, SuaThongTin} = require('../model/index.schema');
const {capitalizeFirstLetter, hashPassWord, customDatetime} = require('./admin_function');
const moment = require('moment');
module.exports = {
    admin_add_teacher: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        const check = await NguoidungSchema
            .findOne({email: data.email, loai: false})
            .countDocuments((count) => count)
            .catch(err => 0);
        if (check) 
            return res.status(400).json({'success': false, 'errors': 'Email đã tồn tại'})
        else {
            const gv = new NguoidungSchema({
                'ho': capitalizeFirstLetter(data.ho),
                'ten': capitalizeFirstLetter(data.ten),
                'email': data.email,
                'gioi_tinh': data.gioi_tinh,
                'sdt': data.sdt,
                'ngay_sinh': customDatetime(data.ngay_sinh),
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
            .countDocuments((count) => count)
            .catch(err => 0);
        if (check) 
            return res.status(400) .json({'success': false, 'errors': 'Email hoặc mã số sinh viên đã tồn tại'})
        else {
            const sv = new SinhvienSchema({
                'ma_sv': data.ma_sv,
                'gioi_tinh': data.gioi_tinh,
                'sdt': data.sdt,
                'ho': capitalizeFirstLetter(data.ho),
                'ten': capitalizeFirstLetter(data.ten),
                'email': data.email,
                'ngay_sinh': customDatetime(data.ngay_sinh),
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
        let {search, sort} = req.query
        sort = sort ? { [sort]: 1} : {};
        search = search ? {$or: [{"ho": {$regex:'.*'+search+'.*' }}, { "ten": {$regex:'.*'+search+'.*' }}],  loai: false } : {loai: false};
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        await NguoidungSchema
            .find(search)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .sort(sort)
            .exec((err, data) => {
                if (!err && data){
                    let result = [];
                data.map((item) => {
                    result.push({
                        ho: item.ho,
                        ten: item.ten,
                        _id: item._id,
                        email: item.email,
                        ngay_sinh: moment(item.ngay_sinh).format('YYYY-MM-DD'),
                    })
                });
                NguoidungSchema
                .countDocuments( search, (err, count) => {
                    err ? res.status(400).json({'success': false, 'errors': err})
                        : res.status(200).json({
                            success: true,
                            count,
                            data: result ? result : data,
                            current: page,
                            pages: Math.ceil(count / perPage)
                    });
                });
                } else res.status(400).json({success: false, errors: 'Không tìm thấy'})
                
            });
    },
    admin_get_student_list: async function (req, res) {
        let {search, sort} = req.query
        sort = sort ? { [sort]: 'desc'} : {};
        search = search ? {$or: [{"ho": {$regex:'.*'+search+'.*' }}, { "ten": {$regex:'.*'+search+'.*' }}]} : {};
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        await SinhvienSchema
            .find(search, ['ho', 'ten', '_id', 'email', 'ngay_sinh'])
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .sort(sort)
            .exec((err, data) => {
                if (!err && data){
                let result = [];
                data.map((item) => {
                    result.push({
                        ho: item.ho,
                        ten: item.ten,
                        _id: item._id,
                        email: item.email,
                        ngay_sinh: moment(item.ngay_sinh).format('YYYY-MM-DD'),
                    })
                })
                SinhvienSchema.countDocuments(search,
                (err, count) => {
                    err ? res.status(400).json({'success': false, 'errors': err})
                        : res.status(200).json({
                            success: true,
                            count,
                            data: result ? result : data,
                            current: page,
                            pages: Math.ceil(count / perPage)
                    });
                });} else res.status(400).json({success: false, errors: 'Không tìm thấy'})
            });
    },
    admin_get_teacher_detail: async function (res, next, id) {
        await NguoidungSchema
            .findOne({ '_id':id, 'loai': false}, ['-mat_khau'])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, data) => {
                if( !err && data ){
                let result = {
                    ho : data.ho,
                    _id: data._id,
                    ten: data.ten,
                    email: data.email,
                    anh_dai_dien: data.anh_dai_dien,
                    nguoi_tao_id: data.nguoi_tao_id,
                    ngay_sinh : customDatetime(data.ngay_sinh),
                    createdAt : customDatetime(data.createdAt),
                    updatedAt : customDatetime(data.updatedAt),
                };
                res.status(200).json({'success': true, 'data': result})
            } else res.status(400).json({'success': false, 'erros': 'Lỗi không tìm thấy!'})
            })
    },
    admin_get_student_detail: async function (res, next, id) {
        await SinhvienSchema
            .findOne({ '_id': id }, ['ma_sv', 'ds_lop_hoc', 'ho', 'ten', '_id', 'email', 'ngay_sinh', 'anh_dai_dien', 'nguoi_tao_id', 'createdAt', 'updatedAt'])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate({path: 'ds_lop_hoc', model: 'LopHoc'})
            .exec((err, data) => {
                if ( !err && data ){
                let result = {
                    ma_sv: data.ma_sv,
                    ds_lop_hoc: data.ds_lop_hoc,
                    _id: data._id,
                    ho : data.ho,
                    ten: data.ten,
                    email: data.email,
                    anh_dai_dien: data.anh_dai_dien,
                    nguoi_tao_id: data.nguoi_tao_id,
                    ngay_sinh : customDatetime(data.ngay_sinh),
                    createdAt : customDatetime(data.createdAt),
                    updatedAt : customDatetime(data.updatedAt),
                    gioi_tinh : data.gioi_tinh ? data.gioi_tinh : null,
                    sdt: data.sdt? data.sdt : null,
                };
                res.status(200).json({'success': true, 'data': result})
            } else res.status(400).json({'success': false, 'erros': 'Lỗi không tìm thấy!'})
            })
    },
    admin_get_edit_profile_user: async function(req, res){
        const {id} = req.query; 
        SuaThongTin.findById(id).exec((err, data)=>{
            err ? res.status(400).json({ success: false, 'err': err }) : res.status(200).json({'success': true, data})
        })
    },
    admin_update_user: async function (req, res) {
        const [{id,loai}, data, option]= [req.query, req.body, { new: true, useFindAndModify: false }];
        const update = data;
        (loai == 'student') ? (
            SinhvienSchema.findOneAndUpdate({_id:id}, { $set: update}, option, function (err, updated){
                err ? res.status(400).json({'success': err, 'errors': 'Lỗi không xác định'}) : res.status(200).json({'success': true, 'msg': 'Cập nhật thành công', 'data':updated})
            })
        ) : (
            NguoidungSchema.findOneAndUpdate(id, { $set: update}, option, function (err, updated){
                err ? res.status(400).json({'success': err, 'errors': 'Lỗi không xác định'}) : res.status(200).json({'success': true, 'msg': 'Cập nhật thành công', 'data':updated})
            }))
    },
    admin_add_students_by_file: async function (req, res, next){
        const {data} = req.body;
        for ( let i = 0 ; i < data.length ; i++ ) {
            const sv = new SinhvienSchema({
                'ma_sv': data[i].ma_sv,
                'ho': capitalizeFirstLetter(data[i].ho),
                'ten': capitalizeFirstLetter(data[i].ten),
                'email': data.email,
                'ngay_sinh': customDatetime(data[i].ngay_sinh),
                'mat_khau': await hashPassWord(data[i].ho + data[i].ten),
                'nguoi_tao_id': req.user._id
            });
            sv.save( (err)=>{
                if (err) next(err)
            })
        };
        res.status(200).json({'success': true})
    },
    admin_add_teachers_by_file: async function (req, res, next){
        const {data} = req.body;
        for ( let i = 0 ; i < data.length ; i++ ) {
            const gv = new NguoidungSchema({
                'ho': capitalizeFirstLetter(data.ho),
                'ten': capitalizeFirstLetter(data.ten),
                'email': data.email,
                'ngay_sinh': customDatetime(data.ngay_sinh),
                'mat_khau': await hashPassWord(data.password),
                'nguoi_tao_id': req.user._id
            })
            gv.save( (err)=>{
                if (err) next(err)
            })
        };
        res.status(200).json({'success': true})
    },
};
