const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LopHocSchema = new Schema({
    tieu_de: {
        type: String,
        unique: true,
        required: true
    },
    nguoi_tao_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'NguoiDung'
    },
    ds_sinh_vien: [{
        type: Schema.Types.ObjectId,
        ref: 'SinhVien',
        default: {}
    }],
    ds_bai_tap: [{
        type: Schema.Types.ObjectId,
        ref: 'BaiTap',
    }],
    ds_bai_thi: [{
        type: Schema.Types.ObjectId,
        ref: 'BaiThi',
        default: {}
    }],
}, {timestamps: true});
module.exports = mongoose.model('LopHoc', LopHocSchema, 'lop_hoc');