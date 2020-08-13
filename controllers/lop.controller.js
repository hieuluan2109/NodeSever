const {validationResult} = require('express-validator');
const {LopHocSchema} = require('../model/index.schema');
const {customDatetime} = require('./admin_function');
module.exports = {
    admin_get_class_list: async function (req, res) {
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        let {search} = req.query;
        search = search ? {"tieu_de": {$regex:'.*'+search+'.*' }} : {};
        await LopHocSchema
            .find(search)
            .populate('nguoi_tao_id', ['_id', 'ma_sv', 'ho', 'ten'])
            .populate({
                path: 'ds_sinh_vien',
                model: 'SinhVien',
                select: ['_id', 'ho', 'ten']
            })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, data) => {
                if ( !err && data) {
                LopHocSchema.countDocuments(search,
                (err, count) => {
                    (err && !count ) ? res.status(400).json({'success': false, 'errors': err})
                        : res.status(200).json({
                            success: true,
                            count,
                            data,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        });
                    }
                )} else res.status(400).json({success: false, errors: 'Không tìm thấy'}) 
            });
    },
    admin_get_class_detail: async function (req, res) {
        await LopHocSchema
            .findOne({_id: req.params.id})
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate({
                path: 'ds_sinh_vien',
                model: 'SinhVien',
                select: ['_id', 'ma_sv', 'ho', 'ten']
            })
            .then((data)=>{
                let result = {
                    ds_sinh_vien: data.ds_sinh_vien,
                    ds_bai_tap: data.ds_bai_tap,
                    ds_bai_thi: data.ds_bai_thi,
                    _id: data._id,
                    tieu_de: data.tieu_de,
                    nguoi_tao_id: data.nguoi_tao_id,
                    _v: data._v,
                    createdAt: customDatetime(data.createdAt),
                    updatedAt: customDatetime(data.updatsdAt)
                };
                console.log(result);
                res.status(200).json({'success': true, 'data': result})
            })
            .catch( (err)=>{
                res.status(400).json({'success': false, 'errors': 'Lỗi không xác định'})
            })
    }
}