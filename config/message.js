let resetPasswordContent = (code, hoten) => '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.' +
        'org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
        + '<head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> '
        +  '<meta name="format-detection" content="telephone=no" /> '
        +  '<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;" /> <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />'
        +  '<title>Reset your password<\/title>\
                        <\/head>\
                        <body style="padding:0; margin:0" \>\
                            \<table\
                                border=\"0"\
                                cellpadding=\"0"\
                                cellspacing=\"0"\
                                style=\"margin: 0"\
                                width="100%"\>\
                                <tr\>\
                                    <td height="30"><\/td>\
                                </tr\>\
                                <tr\>\
                                    <td align="center" valign="top" />\
                                        \<table\
                                            width=\"640"\
                                            cellspacing=\"0"\
                                            cellpadding=\"0"\
                                            bgcolor=\"#ffffff"\
                                            class=\"100p"\
                                            style="border-radius: 8px; border: 1px solid #E2E5E7; overflow:hidden;"\>\
                                            <tr\>\
                                                <td height="20"></td\>\
                                            </tr\>\
                                            <tr\>\
                                                <td width="640" valign="top" class="100p"\>\
                                                    <table border="0" cellspacing="0" cellpadding="0" width="640" class="100p"\>\
                                                        <tr\>\
                                                            <td align="left" width="50%" class="100padtopbottom" style="padding-left: 20px"\>\
                                                               \ \<\/td>\
                                                            </tr\>\
                                                            <tr\>\
                                                                <td colspan="2" width="640" height="160" class="100p"\>\
                                                                    \<img\
                                                                        alt=\"Logo"\
                                                                        src=\"https://s3-us-west-2.amazonaws.com/descript-public/email/bg-pwd%402x.jpg"\
                                                                        width=\"640"\
                                                                        style=\"width: 100%; max-width: 640px; font-family: Arial, sans-serif; color: #ffffff; font-size: 20px; display: block; border: 0px; margin-top:0px;"\
                                                                        border="0"><\/td\>\
                                                                <\/tr>\
                                                                \<tr>\
                                                                    \<td\
                                                                        colspan="2" align="left" valign="center" width="640" height="40" class="100p center" style="font-family: Arial, sans-serif; font-weight: bold; font-size:14px;padding: 0px 20px;">\
                                                                        \<font face="Arial, sans-serif">\
                                                                            <b>Chào '+hoten+'<\/b>\
                                                                        <\/font>\
                                                                    </td>\
                                                                </tr\>\
                                                                <tr\>\
                                                                    <td colspan="2" align="left" valign="center" width="640" class="100p" style="font-family: Arial, sans-serif; font-size:14px; padding: 0px 20px; line-height: 18px;">\
                                                                        <font face="Arial, sans-serif"\>\
                                                                        '
                                                                        +   'Đây là email reset mật khẩu. Nhấn vào nút bên dưới để reset mật khẩu của bạn'
                                                                        + ' \<br>\
                                                                                <br\>\ '
                                                                                    + 'Thân,' +'<br> '
                                                                                    + 'Navilearn'
                                                                                    +' <\/font>\
                                                                                <\/td>\
                                                                            <\/tr>\
                                                                            <tr\>\
                                                                                <td colspan="2" align="center" valign="center" width="640" height="20" class="100p center" style="font-family: Arial, sans-serif; font-weight: bold; font-size:1px;padding: 0px 20px;"><\/td>\
                                                                            <\/tr>\
                                                                        <\/table>\
                                                                    <\/td>\
                                                                <\/tr>\
                                                                <tr\>\
                                                                    <td width="640" class="100p center" height="80" align="center" valign="top"\>\
                                                                        <table border="0" cellspacing="0" cellpadding="0"\>\
                                                                            <tr\>\
                                                                                <td align="center" style="border-radius: 18px;" bgcolor="#0062FF"\>\
                                                                                    <a target="_blank" href="https://admin-navilearn.heroku.com/reset-password?code='+code+'" style="font-size: 14px; font-family: sans-serif; color: #ffffff; text-decoration: none; border-radius: 18px; padding: 5px 16px; border: 1px solid #0062FF; display: inline-block; box-shadow: 0 2px 3px 0 rgba(0,0,0,0.10);"\>\
                                                                                        <!--[if mso]> <![endif]--> '
                                                                                        + 'Reset'
                                                                                        + ' <!--[if mso]> <![endif]--\>\
                                                                                    <\/a>\
                                                                                <\/td>\
                                                                            <\/tr>\
                                                                        <\/table>\
                                                                    <\/td>\
                                                                <\/tr>\
                                                            <\/table>\
                                                        <\/td>\
                                                    <\/tr>\
                                                <\/table>\
                                            </body\> <\/table>\ <\/tr>\ '

module.exports = {
    resetPasswordContent
}