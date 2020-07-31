const Schema = require('../model/index.schema');
module.exports = {
    admin_dashboard: async function (req, res) {
        let choseTime = req.query.time;
        choseTime = choseTime ? { $lt: choseTime } : { $lte: Date.now() };
        Promise.all([
            Schema.NguoidungSchema.countDocuments({'loai': false, createdAt: choseTime}),
            Schema.SinhvienSchema.countDocuments({ createdAt: choseTime }),
            Schema.LopHocSchema.countDocuments({createdAt: choseTime}),
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
    // admin_stats_student: async function(req, res) {
    //     Promise.all([
    //         Schema.SinhvienSchema.countDocuments(   ),
    //     ])
    //     .then(result =>{
    //         res.status(200).json({success: true, result});
    //     })
    //     .catch(err =>  res.status(400).json({success: false, error: err}))
    // },
};