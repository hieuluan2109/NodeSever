import React from 'react'
import Questions from '../component/Question/QuestionList'
import HomePage from './Home'
    function ListCauHoi() {
        return (
            <div>
                <HomePage />
                <Questions
                TITLE="Danh Sách Câu Hỏi"
                STT="Số thứ tự"
                CAUHOI="Câu Hỏi"
                DAPANA="Đáp Án A"
                DAPANB="Đáp Án B"
                DAPANC="Đáp Án C"
                DAPAND="Đáp Án D"
                DAPANDUNG="Đáp Án Đúng"
                DIEM="Điểm"
                NGUOITAO="Người Tạo"
                NGAYTAO="Ngày Tạo"
                />
            </div>
      
        );
      }
      
      export default ListCauHoi;
