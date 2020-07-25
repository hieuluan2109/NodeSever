const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TuLuanSchema = new Schema({
    noi_dung: {
        type: String,
        required: true
    },
    diem: {
        type: Number,
        default: 10,
    },
    danh_muc: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'DanhMuc'
    },
    nguoi_tao_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'NguoiDung'
    },
    trang_thai: {
        type: Boolean,
        default: true
    },
}, {timestamps: true});

module.exports = mongoose.model('TuLuan', TuLuanSchema, 'cau_hoi_tu_luan');
