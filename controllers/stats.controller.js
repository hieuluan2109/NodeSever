const Schema = require('../model/index.schema');
const {customDatetime} = require('./admin_function');
module.exports = {
    admin_dashboard: async function (req, res) {
        let choseTime = req.query.time;
        choseTime = choseTime ? { $lte: choseTime } : { $lte: Date.now() };
        Promise.all([
            Schema.NguoidungSchema.countDocuments({'loai': false, createdAt: choseTime}),
            Schema.SinhvienSchema.countDocuments({ createdAt: choseTime }),
            Schema.LopHocSchema.countDocuments({ createdAt: choseTime }),
            Schema.TracNghiemSchema.countDocuments({createdAt: choseTime}),
            Schema.TuLuanSchema.countDocuments({createdAt: choseTime}),
            Schema.DanhMucSchema.countDocuments({createdAt: choseTime}),
            Schema.BaiThiSchema.countDocuments({createdAt: choseTime}),
        ])
        .then(result =>{
            const stats = {
                'giao_vien': result[0],
                'sinh_vien': result[1],
                'lop_hoc': result[2],
                'cau_hoi_trac_nghiem': result[3],
                'cau_hoi_tu_luan': result[4],
                'danh_muc': result[5],
                'bai_thi': result[6],
            };
            res.status(200).json({success: true, stats});
        })
        .catch(err =>  res.status(400).json({success: false, error: err}))
    },
    admin_stats_point: async (req, res) => {
        let {id} = req.query;
        id = id ? {sinh_vien_id: id} : {};
        Schema.DiemSchema.find(id,'diem -_id')
        .then((data)=>{
            console.log(data)
            let result = {
                0 : 0,
                1 : 0,
                2 : 0,
                3 : 0,
                4 : 0,
                5 : 0,
                6 : 0,
                7 : 0,
                8 : 0,
                9 : 0,
                10 : 0,
            };
            data.map((row, index)=>{
                let tamp = Math.round(row.diem)
                result[tamp] = result[tamp]+1;
            })
            res.json({data: result})
        })
        .catch((err)=>{
            res.json({err})
        })
    },
    admin_get_stats_top_student: async function(req, res, next) {
        Schema.DiemSchema.aggregate([
            {
                $group : {
                    _id : '$sinh_vien_id',
                    avg: { $avg: '$diem'} 
                }
            },
            {$limit : 3}
        ])
        // .then(data=>{
        .exec((err, data)=>{
           Promise.all([
               data[0] ? Schema.SinhvienSchema.findById(data[0]._id,'ho ten') : next,
               data[1] ? Schema.SinhvienSchema.findById(data[1]._id,'ho ten') : next,
               data[2] ? Schema.SinhvienSchema.findById(data[2]._id,'ho ten') : next,
           ]).then(re=>{
               let result = {data, info: re};
               res.status(200).json({result})
            })
        })
            // res.status(200).json({'success': true, data})
        // }).catch((error)=>{
        //     res.status(400).json({'success': false, 'errors': 'Lỗi không tìm thấy'})
        // })

    },
    amdin_get_class_belong_a_teacher: async function (req, res) {
        let {id} = req.query;
        Schema.LopHocSchema.find({nguoi_tao_id: id}, 'tieu_de _id createdAt updatedAt')
        .then(async data=>{
            let result = [];
            data.map((value, index)=>{
                result.push({
                    _id: value._id,
                    tieu_de: value.tieu_de,
                    createdAt: customDatetime(value.createdAt, 1),
                    updatedAt: customDatetime(value.updatedAt, 1),
                })
            })
            let bai_thi = await Schema.BaiThiSchema.countDocuments({nguoi_tao_id: id}).then(exam=>exam);
            let bai_tap = await Schema.BaiTapSchema.countDocuments({nguoi_tao_id: id}).then(exam=>exam);
        res.status(200).json({count: result.length, bai_thi, bai_tap, data: result})
        })
        .catch( err =>  res.status(400).json({err}))
    }
};