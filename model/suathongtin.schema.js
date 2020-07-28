const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SuaThongTinSchema = new Schema({
    trang_thai: {
        type: Boolean,
        default: true,
    },
    nguoi_dung_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    thong_tin_sua: {
        type: Object,
        required: true,
    },
    ly_do: {
        type: String,
        required: true,
    },
    la_sinhvien: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true});
module.exports = mongoose.model('SuaThongTin', SuaThongTinSchema, 'sua_thong_tin');