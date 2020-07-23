const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
<<<<<<< Updated upstream
=======
const Schema = require('../model/index.schema')
const moment = require('moment');
>>>>>>> Stashed changes
module.exports = {
    capitalizeFirstLetter: function (string) {
        return string
            .trim()
            .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    },
    sign_token: function (user) {
        const payload = {
            _id: user._id,
            email: user.email,
            loai: true,
            ho: user.ho,
            ten: user.ten
        };
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    },
    hashPassWord: function (password) {
        return bcrypt.hash(password, 10)
    },
    regex: function(){
        return {
            'ngay_sinh_1': /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
            'ngay_sinh': /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
            'massv': /^[0-9]{10}$/,
            'ho_ten': /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
        };
    },
    removeAscent: function(str) { //Emergence
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        return str;
      },
    checkPassword: function(password, password2) {
        return bcrypt.compareSync(password, password2);
<<<<<<< Updated upstream
    }
=======
    },
    customDatetime: function(date){
        return moment(date).format('YYYY-MM-DD');
    },
>>>>>>> Stashed changes
} 