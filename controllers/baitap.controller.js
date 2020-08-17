const {BaiTapSchema} = require('../model/index.schema');
const {customDatetime} = require('./admin_function');
module.exports = {
    admin_get_exercise_list: async function (req, res) {
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        let {search} = req.query;
        search = search
                 ? {"tieu_de": {$regex:'.*'+search+'.*' }, "noi_dung": {$regex:'.*'+search+'.*' }} : {}
        await BaiTapSchema
            .find(search)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate('ds_sinh_vien_da_lam', 'ten ho ma_sv')
            .exec( (err, data) => {
                if ( data && !err ) {
                    let result= [];
                    data.map((item) => {
                        result.push({
                            _id: item._id,
                            nguoi_tao_id: item.nguoi_tao_id,
                            tieu_de: item.tieu_de,
                            noi_dung: item.noi_dung,
                            lop_hoc_id: item.lop_hoc_id,
                            tap_tin: item.tap_tin,
                            han_nop_bai:  customDatetime(item.han_nop_bai, 1),
                            trang_thai: item.trang_thai,
                            ds_sinh_vien_da_lam: item.ds_sinh_vien_da_lam,
                            createdAt: customDatetime(item.createdAt, 1),
                            updatedAt: customDatetime(item.updatedAt, 1),
                        })
                    })
                    BaiTapSchema.countDocuments(search,
                    (err, count) => {
                        err ? res.status(400).json({'success': false, 'errors': err})
                            : res.status(200).json({
                                success: true,
                                count,
                                data: result,
                                current: page,
                                pages: Math.ceil(count / perPage)
                            });
                    }
                )} else res.status(400).json({success: false, errors: 'Không tìm thấy'})
        })
    },
    admin_get_exercise_belong_class: async function (req, res) {
        const {id} = req.query;
        await BaiTapSchema
            .find({lop_hoc_id: id})
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate('ds_sinh_vien_da_lam', ['ten ho ma_sv'])
            .then((data)=>{
                let result= [];
                    data.map((item) => {
                        result.push({
                            _id: item._id,
                            nguoi_tao_id: item.nguoi_tao_id,
                            tieu_de: item.tieu_de,
                            noi_dung: item.noi_dung,
                            lop_hoc_id: item.lop_hoc_id,
                            tap_tin: item.tap_tin,
                            han_nop_bai: customDatetime(item.han_nop_bai, 1),
                            trang_thai: item.trang_thai,
                            ds_sinh_vien_da_lam: item.ds_sinh_vien_da_lam,
                            createdAt: customDatetime(item.createdAt, 1),
                            updatedAt: customDatetime(item.updatedAt, 1),
                        })
                    })
                res.status(200).json({'success': true, data: result})
            })
            .catch((err)=>{
                res.status(400).json({'success': false, 'errors': 'Không tìm thấy'})
            })
    },
};