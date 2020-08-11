const {BaiThiSchema} = require('../model/index.schema');
const {customDatetime} = require('./admin_function');
module.exports = {
    admin_get_test_list: async function (req, res) {
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        let {search} = req.query;
        search = search ? {"tieu_de": {$regex:'.*'+search+'.*' }} : {}
        await BaiThiSchema
            .find(search)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate('ds_cau_hoi.cau_hoi_id', )
            .exec( (err, data) => {
                if ( data && !err ) {
                    let result= [];
                    data.map((item) => {
                        result.push({
                            nguoi_tao_id: item.nguoi_tao_id,
                            tieu_de: item.tieu_de,
                            lop_hoc_id: item.lop_hoc_id,
                            ngay_thi: customDatetime(item.ngay_thi),
                            thoi_gian_thi: item.thoi_gian_thi,
                            trang_thai: item.trang_thai,
                            ds_cau_hoi: item.ds_cau_hoi,
                            ds_sinh_vien: item.ds_sinh_vien,
                            ds_binh_luan: item.ds_binh_luan,
                            ds_sinh_vien_da_thi: item.ds_sinh_vien_da_thi,
                            createdAt: customDatetime(item.createdAt),
                            updatedAt: customDatetime(item.updatedAt),
                        })
                    })
                    BaiThiSchema.countDocuments(search,
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
    admin_get_test_detail: async function (req, res) {
        const {id} = req.query;
        await BaiThiSchema
            .findById(id)
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate('lop_hoc_id')
            .exec( (err, data)=>{
                err ? res.status(400).json({'success': false, 'errors': err}) : res.status(200).json({'success': true, 'data': data})
            });
    },
};