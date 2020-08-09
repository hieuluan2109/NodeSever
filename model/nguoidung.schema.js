const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NguoidungSchema = new Schema({
    ho: {
        required: true,
        type: String
    },
    ten: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    anh_dai_dien: {
        type: String,
        default: 'default.jpg'
    },
    ngay_sinh: {
        required: true,
        type: Date,
    },
    mat_khau: {
        required: true,
        type: String,
    },
    loai: {
        type: Boolean,
        default: false
    },
    nguoi_tao_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'NguoiDung'
    }
}, {timestamps: true});
module.exports = mongoose.model('NguoiDung', NguoidungSchema, 'nguoi_dung');