const {validationResult} = require('express-validator');
const {LopHocSchema} = require('../model/index.schema');
module.exports = {
    admin_get_class_list: async function (req, res) {
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        let {search} = req.query;
        search = search ? {"tieu_de": {$regex:'.*'+search+'.*' }} : {};
        await LopHocSchema
            .find(search)
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate({
                path: 'ds_sinh_vien',
                model: 'SinhVien',
                select: ['_id', 'ho', 'ten']
            })
            .populate({
                path: 'ds_bai_thi',
                model: 'BaiThi',
                select: ['_id', 'tieu_de', 'trang_thai']
            })
            .populate({
                path: 'ds_bai_tap',
                model: 'BaiTap',
                select: ['_id', 'tieu_de', 'trang_thai']
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
                select: ['_id', 'ho', 'ten']
            })
            .populate({
                path: 'ds_bai_thi',
                model: 'BaiThi',
                select: ['_id', 'tieu_de', 'trang_thai']
            })
            .populate({
                path: 'ds_bai_tap',
                model: 'BaiTap',
                select: ['_id', 'tieu_de', 'trang_thai']
            })
            .exec((err, result) => {
                (err && !result) ? res.status(400).json({'success': false, 'errors': err}) : res.status(200).json({'success': true, 'data': result})
            })
    }
}