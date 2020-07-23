import React, { Component } from "react";
import InfoUser from "../component/Users/InfoUsers";
import HomePage from "../view/Home";
// function InfoUsers() {
//     return (
//         <div>
//             <HomePage />
//             <InfoUser
//             title="Danh Sách Người Dùng"
//             stt="Số thứ tự"
//             firstname="Họ"
//             lastname="Tên"
//             email="Email"
//             DoB="Ngày sinh"
//             />
//         </div>

//     );
//   }

//   export default InfoUsers;

class InfoUsers extends Component {
  ư;
  constructor(props) {
    super(props);
    this.state = {
        // a:{
        //     x:'',
        //     d:'c',
        //     f:[]
        // }
    };
  }
  render() {
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
            // info={this.state.a}
        />
      </div>
    );
  }
}

export default InfoUsers;
