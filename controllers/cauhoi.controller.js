const {validationResult} = require('express-validator');
const {TracNghiemSchema, TuLuanSchema} = require('../model/index.schema');
module.exports = {
    admin_get_question_list: async function (req, res) {
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        const {loai} = req.query;
        let {search} = req.query;
        search = search ? {$or: [{"noi_dung": {$regex:'.*'+search+'.*' }}] } : {};
        (( loai ? loai : 'choice') == 'assay')
        ?   (await TuLuanSchema
            .find(search)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('danh_muc',['tieu_de'])
            .exec((err, data) => {  
                console.log(data)
                if ( data && !err ) {
                TuLuanSchema.countDocuments(search,
                (err, count) => {
                    err ? res.status(400).json({'success': false, 'errors': err})
                        : res.status(200).json({
                            success: true,
                            count,
                            data,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        });
                }
            )} else res.status(400).json({success: false, errors: 'Không tìm thấy'})
            }))
        :  (await TracNghiemSchema
            .find(search,['trang_thai', 'noi_dung', 'danh_muc', 'diem'])
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('danh_muc',['tieu_de'])
            .exec((err, data) => {
                if ( !err && data) {
                TracNghiemSchema.countDocuments(search,
                (err, count) => {
                    err ? res.status(400).json({'success': false, 'errors': err})
                        : res.status(200).json({
                            success: true,
                            count,
                            data,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        });
                }
            );} else res.status(400).json({success: false, errors: 'Không tìm thấy'})
            }))
    },
    admin_get_question_detail: async function (req, res) {
        const {loai, q_id} = req.query;
        (loai == 'choice')
        ? (await TracNghiemSchema
            .findOne({_id: q_id})
            .populate('danh_muc', ['_id', 'tieu_de', 'mo_ta'])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                err ? res.status(400).json({'success': false, 'errors': err}) : res.status(200).json({'success': true, 'data': result})
            }))
        : (await TuLuanSchema
            .findOne({_id: q_id})
            .populate('danh_muc', ['_id', 'tieu_de', 'mo_ta'])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                err ? res.status(400).json({'success': false, 'errors': err}) : res.status(200).json({'success': true, 'data': result})
            }))
    },
    admin_create_question_choice: async function (req, res, next) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        let question = new TracNghiemSchema({
                'noi_dung': data.noi_dung,
                'dap_an': data.dap_an,
                'nguoi_tao_id': req.user._id,
                'lua_chon': data.lua_chon,
                'danh_muc': data.danh_muc,
                'diem': data.diem ? data.diem : 10, })
        question.save(function (err, doc) {
            err
                ? res.status(400).json({'success': false, 'errors': err})
                : res.status(200).json({'success': true, 'msg': 'Thêm câu hỏi thành công'})
        });
    },
    admin_create_question_assay: async function (req, res, next) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        let question = new TuLuanSchema({
                'noi_dung': data.noi_dung,
                'nguoi_tao_id': req.user._id,
                'danh_muc': data.danh_muc,
                'diem': data.diem ? data.diem : 10 });
        question.save(function (err, doc) {
            err
                ? res.status(400).json({'success': false, 'errors': err})
                : res.status(200).json({'success': true, 'msg': 'Thêm câu hỏi thành công'})
        });
    },
}