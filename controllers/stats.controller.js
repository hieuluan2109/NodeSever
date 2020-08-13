const Schema = require('../model/index.schema');
module.exports = {
    admin_dashboard: async function (req, res) {
        let choseTime = req.query.time;
        choseTime = choseTime ? { $lt: choseTime } : { $lte: Date.now() };
        Promise.all([
            Schema.NguoidungSchema.countDocuments({'loai': false, createdAt: choseTime}),
            Schema.SinhvienSchema.countDocuments({ createdAt: choseTime }),
            Schema.LopHocSchema.countDocuments(),
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
        Schema.DiemSchema.find({},'diem -_id')
        .then((data)=>{
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
    admin_get_stats_top_student: async function(req, res) {
        // Schema.DiemSchema.find({},'diem sinh_vien_id -_id')
        //     .populate('sinh_vien_id', 'ma_sv -_id ho ten')
        //     .then(result =>{
        //         let data = [];
        //         result.map((row, index)=>{
        //             index == 0
        //             ? data.push(row.sinh_vien_id.ma_sv)
        //             : data.
        //         })
        //         res.status(200).json({success: true, data});
        //     })
        //     .catch(err =>  res.status(400).json({success: false, error: err}))
        Schema.DiemSchema.aggregate([
            {
                $group : {
                    _id : '$sinh_vien_id',
                    count: { $avg: "$diem"} 
                },
                $limit : 3
            }
        ], function(err, data) {
            if ( err || !data )
                res.status(400).json({'success': false, 'errors': 'Lỗi không tìm thấy'})
            else 
                res.status(200).json({'success': true, data})
        })
    },
};