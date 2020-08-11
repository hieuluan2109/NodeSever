const {validationResult} = require('express-validator');
const {DanhMucSchema} = require('../model/index.schema');
const {customDatetime} = require('./admin_function');
module.exports = {
    admin_create_category: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({'success': false, 'errors': errors.array()})
        }
        const [_id,{tieu_de, mo_ta}, option] = [req.user, req.body,{ new: true, useFindAndModify: false }];
        const update= {tieu_de: tieu_de, mo_ta: mo_ta, nguoi_tao_id: _id};
        await DanhMucSchema.findOne({tieu_de: tieu_de})
        .then(result => {
            if ( result)
                res.status(400).json({ success: false, errors: 'Chủ đề đã tồn tại' })
            else {
                const newRC = new DanhMucSchema(update)
                newRC.save( function (err, doc){
                    if (err)
                        res.status(400).json({ success: false, errors: err }) 
                    else
                        res.status(200).json({ success: true, msg: 'Tạo thành công' })
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({ success: false, errors: err }) 
        })
    },
    admin_get_category_list: async function (req, res) {
        let perPage = req.query.limit || 10;
        let page = req.query.page || 1;
        let {search, sort} = req.query;
        sort = sort ? sort : {};
        search = search ? {"mo_ta": {$regex:'.*'+search+'.*' }, "tieu_de": {$regex:'.*'+search+'.*' }} : {};
        await DanhMucSchema
            .find(search)
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .sort(sort)
            .exec((err, data) => {
                if ( !err && data) {
                    let result= [];
                    data.map((item) => {
                        result.push({
                            _id: item._id,
                            tieu_de: item.tieu_de,
                            mo_ta: item.mo_ta,
                            nguoi_tao_id: item.nguoi_tao_id,
                            createdAt: customDatetime(item.createdAt),
                            updatedAt : customDatetime(item.updated),
                        })
                    })
                DanhMucSchema.countDocuments(search,
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
            });
    },
    admin_get_detail_category: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        };
        await DanhMucSchema
            .findOne({'_id': req.params.id})
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                if (err)
                    res.status(400).json({'success': false, 'errors': err}) 
                else {
                    let data = result.toObject();
                    data.createdAt = customDatetime(result.createdAt);
                    data.updatedAt = customDatetime(result.updatedAt);
                    res.status(200).json({'success': true, 'data': data})
                }
            })
    },
    admin_update_category: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        };
        const {id} = req.params;
        const [{tieu_de, mo_ta}, option] = [req.body, { new: true, useFindAndModify: false }];
        const update = {'tieu_de': tieu_de, 'mo_ta': mo_ta};
        await DanhMucSchema.findOneAndUpdate({_id: id},{ $set: update}, option, function (err, updated){
            (err || !updated) ? res.status(400).json({'success': false, 'errors': err}) : res.status(200).json({'success': true, 'msg': 'Cập nhật thành công', 'data':updated})
        })
    },
}