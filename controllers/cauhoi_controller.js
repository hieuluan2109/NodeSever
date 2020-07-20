const {validationResult} = require('express-validator');
const {CauHoiSchema} = require('../model/Schema');
module.exports = {
    admin_get_question_list: async function (req, res) {
        let perPage = 10;
        let page = req.query.page || 1;
        await CauHoiSchema
            .find({})
            .populate('danh_muc_id', ['_id', 'tieu_de'])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, data) => {
                if (err) 
                    res
                        .status(400)
                        .json({'success': false, 'errors': err})
                    CauHoiSchema.countDocuments(
                    (err, count) => {
                        if (err) 
                            res
                                .status(400)
                                .json({'success': false, 'errors': err})
                        res
                            .status(200)
                            .json({
                                success: true,
                                data,
                                current: page,
                                pages: Math.ceil(count / perPage)
                            });
                    }
                );
            });
    },
    admin_get_question_detail: async function (req, res) {
        await CauHoiSchema
            .findOne({_id: req.params.id})
            .populate('danh_muc_id', ['_id', 'tieu_de'])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                if (err) 
                    res
                        .status(400)
                        .json({'success': false, 'errors': err})
                res
                    .status(200)
                    .json({'success': true, 'data': result})
            })
    },
    admin_create_question: async function (req, res, next) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        const question = new CauHoiSchema(
            {'noi_dung': data.noi_dung, 'dap_an': data.dap_an, 'nguoi_tao_id': req.user._id, 'dap_an_dung': data.dap_an_dung, 'danh_muc_id': data.danh_muc_id}
        );
        question.save(function (err, doc) {
            if (err) 
                return res
                    .status(400)
                    .json({'success': false, 'errors': err})
            res
                .status(200)
                .json({'success': true, 'msg': 'Thêm câu hỏi thành công'})
        });
    }
}