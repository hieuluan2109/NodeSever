const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CauHoiSchema = new Schema({
    noi_dung: {
        type: String,
        required: true
    },
    dap_an: [
        { 
            _id: false,
            id: {
                type: Number,
                default: 1
            },
            label: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true
            }
        }, {
            _id: false,
            id: {
                type: Number,
                default: 2
            },
            label: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }, {
            _id: false,
            id: {
                type: Number,
                default: 3
            },
            label: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }, {
            _id: false,
            id: {
                type: Number,
                default: 4
            },
            label: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ],
    dap_an_dung: {
        type: Number,
        required: true
    },
    nguoi_tao_id: {
        type: Schema.Types.ObjectId,
        ref: 'NguoiDung'
    },
    danh_muc_id: {
        type: Schema.Types.ObjectId,
        ref: 'DanhMuc'
    },
    diem: {
        type: Number,
        required: true,
        default: 1
    }
}, {timestamps: true});
module.exports = mongoose.model('CauHoi', CauHoiSchema, 'cau_hoi');