import React from "react";
import ChangePass from "./ChangePasswordForm";
import ProfileMenu from "./MenuProfile";


export default function MenuProfile() {
  return (
    <div className="row">
      <div className="col span-1-of-4">
        <ProfileMenu />
      </div>
      <div className="col span-3-of-4">
        <ChangePass
          title="Đổi mật khẩu"
          oldPassword="Mật khẩu hiện tại"
          newPassword="Mật khẩu mới"
          confirmPassword="Xác nhận mật khẩu mới"
        />
      </div>
    </div>
  );
}
