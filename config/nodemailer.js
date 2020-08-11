const {A_MAIL, P_MAIL, PORT_MAIL, HOST_MAIL, SECURE_MAIL, SERVICE_MAIL, TLS_MAIL} = process.env;
const URL = 'http://navilearn.herokuapp.com/';
// const forgotPasswordContent =(code)=>`
// <h3>Chào bạn</h3></br>Hãy nhấn vào liên kết này để lấy lại mật khẩu: 
//     <a href="${URL}/quen-mat-khau/${code}">
//     ${URL}/quen-mat-khau/${code}</a>
//  `;

const createMailOption = { // config mail server
    service: SERVICE_MAIL || 'gmail',
    host: HOST_MAIL || 'smtp.googlemail.com',
    port: PORT_MAIL || 587,
    secure: SECURE_MAIL || true,
    requireTLS: TLS_MAIL || false,
    auth: {
        user: A_MAIL || 'hieuluan.2109@gmail.com',
        pass: P_MAIL || 'Cookcie00999'
    },
};
const sendMailOption = (mail, content) => {
    return {
        from: 'Navilearn',
        to: mail, 
        subject: 'Navilearn: Mail reset password',
        html: content }
};
module.exports = {
    createMailOption,
    sendMailOption,
}
