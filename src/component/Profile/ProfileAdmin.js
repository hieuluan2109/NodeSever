import React from "react";
import Profile from "./Profile";
import ProfileMenu from "./MenuProfile";


export default function MenuProfile(props) {
  return (
    <div>
      {/* <div className="col span-1-of-4">
        <ProfileMenu />
      </div>
      <div className="col span-3-of-4"> */}
        <Profile
          view={props.view}
          title="Thông tin tài khoản"
          firstname="Họ"
          lastname="Tên"
          birthday="Ngày sinh"
          email="Email"
        />
      {/* </div> */}
    </div>
  );
}
