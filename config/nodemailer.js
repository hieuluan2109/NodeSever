const {A_MAIL, P_MAIL, PORT_MAIL, HOST_MAIL, SECURE_MAIL, SERVICE_MAIL, TLS_MAIL} = process.env;
const URL = 'http://navilearn.herokuapp.com/';
// const forgotPasswordContent =(code)=>`
// <h3>Chào bạn</h3></br>Hãy nhấn vào liên kết này để lấy lại mật khẩu: 
//     <a href="${URL}/quen-mat-khau/${code}">
//     ${URL}/quen-mat-khau/${code}</a>
//  `;

const createMailOption = { // config mail server
    service: SERVICE_MAIL,
    host: HOST_MAIL,
    port: PORT_MAIL,
    secure: SECURE_MAIL,
    requireTLS: TLS_MAIL,
    auth: {
        user: A_MAIL,
        pass: P_MAIL
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
