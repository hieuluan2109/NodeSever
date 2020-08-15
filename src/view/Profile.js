import React from "react";
import TableData from "../component/Profile/ProfileAdmin";
import HomePage from "../view/Home";
function Profile(props) {
  return (
    <div>
      <HomePage />
      <TableData view={props.view} /> 
    </div>
  );
}

export default Profile;
