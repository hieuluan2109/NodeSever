const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaiTapSchema = new Schema({
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
    lop_hoc_id : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'LopHoc'
    },
    han_nop_bai: {
        required: [true, 'Bắt buộc phải có hạn nộp'],
        type: Date,
    },
    tep_tin: {
        default: '',
        type: String,
    },
    trang_thai: {
        type: Boolean,
        default: true,
    },
    ds_sinh_vien_tham_gia: [{
        type: Schema.Types.ObjectId,
        ref: 'SinhVien',
    }],
}, {timestamps: true});
module.exports = mongoose.model('BaiTap', BaiTapSchema, 'bai_tap');