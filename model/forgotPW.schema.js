const mongoose = require('mongoose')

const Schema = mongoose.Schema

setDateTime = (ms) => {
    var d = new Date()
    d.setTime(d.getTime()+ms)
    return d.getTime()
};

const QuenMatKhauSchema = new Schema({
    code: String,
    expire: {type: Number, default: setDateTime(600*1000)},
    email: String,
},{timestamps: true});
module.exports = mongoose.model('QuenMatKhau', QuenMatKhauSchema, 'quen_mat_khau')
