import React from 'react'
import Thread from '../component/Thread/ThreadList'
import HomePage from './Home'
    function Threadlist() {
        return (
            <div>
                <HomePage />
                <Thread
                title="Danh Sách Chủ Đề"
                stt="Số thứ tự"
                name="Tên chủ đề"
                description="Mô tả"
                createdby="Người tạo"
               
                />
            </div>
      
        );
      }
      
      export default Threadlist;
