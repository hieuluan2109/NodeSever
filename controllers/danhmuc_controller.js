const {validationResult} = require('express-validator');
const {DanhMucSchema} = require('../model/Schema');
module.exports = {
    admin_create_category: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        const newRC = new DanhMucSchema;
        newRC.tieu_de = data.tieu_de;
        newRC.mo_ta = data.mo_ta;
        newRC.nguoi_tao_id = req.user._id;
        newRC.save( (err)=> {
            err ? res.status(400).json({ success: false, errors: err }) : res.status(200).json({success: true, msg: 'Tạo danh mục thành công'})
        });
    },
    admin_get_category_list: async function (req, res) {
        let perPage = 10;
        let page = req.query.page || 1;
        await DanhMucSchema
            .find({})
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, data) => {
                if (err) 
                    res
                        .status(400)
                        .json({'success': false, 'errors': err})
                    DanhMucSchema.countDocuments(
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
    admin_get_detail_category: async function (req, res) {
        await DanhMucSchema
            .findOne({'_id': req.params.id})
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
    }
}