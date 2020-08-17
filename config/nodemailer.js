const {A_MAIL, P_MAIL, PORT_MAIL, HOST_MAIL, SECURE_MAIL, SERVICE_MAIL, TLS_MAIL} = process.env;
const URL = 'http://navilearn.herokuapp.com/';
// const forgotPasswordContent =(code)=>`
// <h3>Chào bạn</h3></br>Hãy nhấn vào liên kết này để lấy lại mật khẩu: 
//     <a href="${URL}/quen-mat-khau/${code}">
//     ${URL}/quen-mat-khau/${code}</a>
//  `;

const createMailOption = { // config mail server
    service:'gmail',
    host: 'smtp.googlemail.com',
    port: 587,
    secure:true,
    requireTLS: false,
    auth: {
        user: 'hieuluan.2109@gmail.com',
        pass: 'Cookcie00999'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
};
const sendMailOption = (mail, content) => {
    return {
        from: 'Navilearn <hieuluan.2109@gmail.com',
        to: mail, 
        subject: 'Navilearn: Mail reset password',
        html: content }
};
module.exports = {
    createMailOption,
    sendMailOption,
}
