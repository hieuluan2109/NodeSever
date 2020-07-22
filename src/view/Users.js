import React from 'react'
import InfoUser from '../component/Users/InfoUsers'
import HomePage from '../view/Home'
    function InfoUsers() {
        return (
            <div>
                <HomePage />
                <InfoUser 
                title="Danh Sách Người Dùng"
                stt="Số thứ tự"
                firstname="Họ"
                lastname="Tên"
                email="Email"
                DoB="Ngày sinh"
                />
            </div>
      
        );
      }
      
      export default InfoUsers;
