const {A_MAIL, P_MAIL, PORT_MAIL, HOST_MAIL, SECURE_MAIL, SERVICE_MAIL, TLS_MAIL} = process.env;
const URL = 'http://navilearn.herokuapp.com/';
// const forgotPasswordContent =(code)=>`
// <h3>Chào bạn</h3></br>Hãy nhấn vào liên kết này để lấy lại mật khẩu: 
//     <a href="${URL}/quen-mat-khau/${code}">
//     ${URL}/quen-mat-khau/${code}</a>
//  `;
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    "465186508352-jmpr1f8buetcoheom017g2dctsroa5pp.apps.googleusercontent.com",
    "x8ATYu5cwHnoOofEUrnte1Xu",
    "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
    refresh_token: "1//0fkeAOT3NCSrKCgYIARAAGA8SNwF-L9IrPZr5XG9kDCVplc6Lw7DhUC2c1wSse5Yl6RpPhJ-xZhI7XNcK2Ss_6oxscHVtDzZ1G_4"
});
const accessToken = oauth2Client.getAccessToken()
const createMailOption = { // config mail server
    service:'gmail',
    // host: 'smtp.googlemail.com',
    // port: 587,
    // secure:true,
    // requireTLS: false,
    auth: {
        type: 'OAuth2',
        user: 'hieuluan.2109@gmail.com',
        // pass: 'Cookcie00999',
        clientId: '465186508352-jmpr1f8buetcoheom017g2dctsroa5pp.apps.googleusercontent.com',
        clientSecret: 'x8ATYu5cwHnoOofEUrnte1Xu',
        refreshToken: "1//0fkeAOT3NCSrKCgYIARAAGA8SNwF-L9IrPZr5XG9kDCVplc6Lw7DhUC2c1wSse5Yl6RpPhJ-xZhI7XNcK2Ss_6oxscHVtDzZ1G_4",
        accessToken: accessToken,
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
