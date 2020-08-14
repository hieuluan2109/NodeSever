const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const binhLuan = {
    id: Schema.Types.ObjectId,
    avatar: String,
    name: String,
    value: String,
    createAt: {type: Date, default: new Date()},
}
const cauHoi = {
    cau_hoi_id: {type: Schema.Types.ObjectId, refPath:'ds_cau_hoi.loai'},
    loai: {type: String, enum:['TracNghiem', 'TuLuan']},
}

const BaiThiSchema = new Schema({
    tieu_de: String,
    nguoi_tao_id: {type: Schema.Types.ObjectId, ref:'NguoiDung'},
    lop_hoc_id: {type: Schema.Types.ObjectId, ref: 'LopHoc'},
    ngay_thi: {type: Date, required: true},
    thoi_gian_thi: {type: Number, required: true},
    trang_thai: {type: Boolean, default: true},
    ds_sinh_vien: [{type: Schema.Types.ObjectId, ref: 'SinhVien'}],
    ds_sinh_vien_da_thi: [{type: Schema.Types.ObjectId, ref: 'SinhVien'}],
    ds_cau_hoi: [cauHoi],
    ds_binh_luan: [binhLuan],
}, {timestamps: true});

module.exports = mongoose.model('BaiThi', BaiThiSchema, 'bai_thi');