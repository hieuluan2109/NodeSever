const {BaiThiSchema} = require('../model/index.schema');
module.exports = {
    admin_get_test_list: async function (req, res) {
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        let {search} = req.query;
        // searh = search ? search : {}
        await BaiThiSchema
            .find()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .populate('ds_cau_hoi.cau_hoi_id', )
            .exec( (err, data) => {
                if ( data && !err ) {
                    BaiThiSchema.countDocuments(
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