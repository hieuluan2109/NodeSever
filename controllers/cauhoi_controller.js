const {validationResult} = require('express-validator');
const {CauHoiSchema, TracNghiemSchema, TuLuanSchema} = require('../model/Schema');
module.exports = {
    admin_get_question_list: async function (req, res) {
        let perPage = 10;
        let page = req.query.page || 1;
        let {loai} = req.query;
        (( loai ? loai : 'TracNghiem') == 'TuLuan')
        ?   (await TuLuanSchema
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, data) => {
                TuLuanSchema.countDocuments(
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
            );
            }))
        :  (await TracNghiemSchema
            .find({},['trang_thai', 'noi_dung', 'danh_muc', 'diem'])
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('danh_muc',['mo_ta'])
            .exec((err, data) => {
                TracNghiemSchema.countDocuments(
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
            );
            }))
    },
    admin_get_question_detail: async function (req, res) {
        const {loai, q_id} = req.query;
        (loai == 'TracNghiem')
        ? (await TracNghiemSchema
            .findOne({_id: q_id})
            .populate('danh_muc', ['_id', 'tieu_de'])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                err ? res.status(400).json({'success': false, 'errors': err}) : res.status(200).json({'success': true, 'data': result})
            }))
        : (await TuLuanSchema
            .findOne({_id: q_id})
            .populate('danh_muc', ['_id', 'tieu_de'])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                err ? res.status(400).json({'success': false, 'errors': err}) : res.status(200).json({'success': true, 'data': result})
            }))
    },
    admin_create_question: async function (req, res, next) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        const question = new CauHoiSchema(
            {'noi_dung': data.noi_dung, 'dap_an': data.dap_an, 'nguoi_tao_id': req.user._id, 'dap_an_dung': data.dap_an_dung, 'danh_muc_id': data.danh_muc_id}
        );
        question.save(function (err, doc) {
            err ? res.status(400).json({'success': false, 'errors': err}) : res.status(200).json({'success': true, 'msg': 'Thêm câu hỏi thành công'})
        });
    }
}