const {BaiThiSchema} = require('../model/index.schema');
const {customDatetime} = require('./admin_function');
module.exports = {
    admin_get_test_list: async function (req, res) {
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        let {search, sort} = req.query;
        sort = sort ? { [sort]: 1} : {};
        search = search
                 ? {$or: [
                     {"tieu_de": {$regex:'.*'+search.toLowerCase()+'.*' }},
                     {"tieu_de": {$regex:'.*'+search.toUpperCase()+'.*' }}
                    ]} : {}
        await BaiThiSchema
            .find(search)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .sort(sort)
            .exec( (err, data) => {
                if ( data && !err ) {
                    let result= [];
                    data.map((item) => {
                        result.push({
                            _id: item._id,
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
            .populate('lop_hoc_id', '_id tieu_de')
            .populate('ds_cau_hoi.cau_hoi_id', '-createdAt -updatedAt -nguoi_tao_id -diem')
            .populate('ds_sinh_vien', 'ho ten _id')
            .populate('ds_sinh_vien_da_thi', 'ho ten _id')
            .exec( (err, data)=>{
                if( err ) 
                    res.status(400).json({'success': false, 'errors': 'Lỗi không xác định'})
                else {
                    let result = data.toObject()
                    result.ngay_thi = customDatetime(data.ngay_thi, 1)
                    result.createdAt = customDatetime(data.createdAt, 1)
                    result.updatedAt = customDatetime(data.updatedAt, 1)
                    res.status(200).json({'success': true, 'data': result})
                }
            });
    },
    admin_get_test_belong_class: async function (req, res) {
        const {id} = req.query;
        await BaiThiSchema
            .find({lop_hoc_id: id})
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate('lop_hoc_id', '_id tieu_de')
            .populate('ds_cau_hoi.cau_hoi_id', '-createdAt -updatedAt -nguoi_tao_id -diem')
            .populate('ds_sinh_vien', 'ho ten _id')
            .populate('ds_sinh_vien_da_thi', 'ho ten _id')
            .then((data)=>{
                let result= [];
                data.map((item) => {
                    result.push({
                        _id: item._id,
                        nguoi_tao_id: item.nguoi_tao_id,
                        tieu_de: item.tieu_de,
                        lop_hoc_id: item.lop_hoc_id,
                        ngay_thi: customDatetime(item.ngay_thi, 1),
                        thoi_gian_thi: item.thoi_gian_thi,
                        trang_thai: item.trang_thai,
                        ds_cau_hoi: item.ds_cau_hoi,
                        ds_sinh_vien: item.ds_sinh_vien,
                        ds_binh_luan: item.ds_binh_luan,
                        ds_sinh_vien_da_thi: item.ds_sinh_vien_da_thi,
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