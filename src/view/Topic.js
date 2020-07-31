import React from 'react'
import Topic from '../component/Topic/Topic'
import HomePage from './Home'
    function TopicList() {
        return (
            <div>
                <HomePage />
                <Topic
                title="Danh Sách Chủ Đề"
                stt="Số thứ tự"
                name="Tên chủ đề"
                description="Mô tả"
                createdby="Người tạo"
               
                />
            </div>
      
        );
      }
      
      export default TopicList;
