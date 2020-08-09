const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cauHoi = {
    cau_hoi_id: {type: Schema.Types.ObjectId, refPath:'ds_cau_hoi.loai'},
    loai: {type: String, enum:['TracNghiem', 'TuLuan']},
}

const BaiThiSchema = new Schema({
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
    ngay_thi: {
        required: true,
        type: Date,
    },
    thoi_gian_thi: {
        required: true,
        type: Number,
    },
    trang_thai: {
        type: Boolean,
        default: true,
    },
    ds_cau_hoi: [cauHoi],
}, {timestamps: true});
module.exports = mongoose.model('BaiThi', BaiThiSchema, 'bai_thi');