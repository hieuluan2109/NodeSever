const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const DiemSchema = new Schema({
    diem: Number,
    sinh_vien_id: {type: Schema.Types.ObjectId, ref: 'SinhVien'},
    lop_hoc_id: {type: Schema.Types.ObjectId, ref :'LopHoc'},
    ex_id: {type: Schema.Types.ObjectId},
    loai: {type: String, enum:['bai_tap', 'bai_thi'], default: 'bai_tap'},
})

module.exports = mongoose.model('Diem', DiemSchema, 'diem')
