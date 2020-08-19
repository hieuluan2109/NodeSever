const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DanhMucSchema = new Schema({
    tieu_de: {
        type: String,
        unique: true,
        required: true
    },
    mo_ta: {
        type: String,
        required: true
    },
    nguoi_tao_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'NguoiDung'
    },
    trang_thai: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});
module.exports = mongoose.model('DanhMuc', DanhMucSchema, 'danh_muc');