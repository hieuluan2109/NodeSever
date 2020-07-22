import React from 'react'
import '../../css/forget-popup.scss'
export default ({ close }) => (
    <div className="container">
        <div>
            <div className="close" onClick={close}>
                &times;
            </div>
        </div>
        <div className="header-popup">	
        Vui lòng nhập email để khôi phục tài khoản:</div>
        <div className="content-popup">
            <input className="mail" type="text" name="email" placeholder="Nhập email"></input>
            <input type="submit" id="btn-xacnhan" value="Gửi xác nhận"></input>
        </div>
    </div>
);

