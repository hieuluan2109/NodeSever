import React from 'react'
import Student from '../component/Students/StudentsList'
import HomePage from './Home'
    function StudentsList() {
        return (
            <div>
                <HomePage />
                <Student
                title="Danh Sách Sinh Viên"
                stt="Số thứ tự"
                firstname="Họ"
                lastname="Tên"
                MSSV="MSSV"
                email="Email"
                DoB="Ngày sinh"
                />
            </div>
      
        );
      }
      
      export default StudentsList;
