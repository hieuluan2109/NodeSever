const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const binhLuan = {
    id: Schema.Types.ObjectId,
    avatar: String,
    name: String,
    value: String,
    createdAt: {type: Date, default: new Date()},
    
}
const tapTin = {fileName: String}
const BaiTapSchema = new Schema({
    tieu_de: String,
    noi_dung: String,
    diem: Number,
    ngay_tao: {type: Date, default: new Date()},
    nguoi_tao_id: {type: Schema.Types.ObjectId, required: true},
    lop_hoc_id: {type:Schema.Types.ObjectId, required: true},
    tap_tin: [tapTin],
    han_nop_bai: {type: Date, required: [true, 'Bắt buộc phải có hạn nộp']},
    trang_thai: {type: Boolean, default: true},
    ds_sinh_vien_da_lam: [{type: Schema.Types.ObjectId, ref: 'SinhVien'}]
}, {timestamps:true});

module.exports = mongoose.model('BaiTap', BaiTapSchema, 'bai_tap');