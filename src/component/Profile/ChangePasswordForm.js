import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    marginTop: "33%",
    marginLeft: "5%",
    background: "#f5f6f8",
  },
  titleformInfo: {
    position: "absolute",
    marginTop: "-35px",
    marginLeft: 60,
    fontSize: 17,
  },

  formInfo: {
    marginTop: "105px",
    marginRight: "6%",
    marginLeft: "6%",
    height: "70vh",
    background: "white",
  },

  formControl: {
    paddingTop: "30px",
    paddingLeft: "30px",
    maxwidth: "600px",
  },
  titleFormControl: {
    width: "150px",
    float: "left",
    marginTop: "10px",
  },
  contentFormControl: {
    width: "450px",
    borderRadius: "5px",
    height: "30px",
    paddingLeft: "20px",
    outline: "none",
    "&:focus": {
      borderColor: "#3f51b5",
    },
  },
  selectDate: {
    margin: theme.spacing(0.5),
    minWidth: 120,
    marginTop: "-10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  btnXacnhan: {
    borderRadius: "5px",
    background: "rgb(253, 216, 53)",
    width: "120px",
    height: "40px",
    marginLeft: "150px",
    cursor: "pointer",
  },
  time: {
    marginBottom: "50px",
  },
  textField: {
    marginTop: "-15px",
    width: 150,
  },
}));

export default function Inforprofile(props) {
  const classes = useStyles();
  
  const [getPassword, setGetPassword] = useState({password:'',password1:'',password2:''});
  const token = Cookies.get("token");

  const handleChange = (event) => {
    setGetPassword({
      ...getPassword,[event.target.name]: event.target.value,
    });
  };

  const onSubmitInfo = (event) => {
    event.preventDefault();
   const {password,password1,password2}=getPassword
    // setDataProfile(getDataProfile)
    axios
      .post(
        "https://navilearn.herokuapp.com/admin/changepassword",
        { password, password1,password2},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Lỗi", error.response);
      });
  };
  const { title, oldPassword,newPassword, confirmPassword} = props;
  return (
    <div>
      <div className={classes.titleformInfo}>{title}</div>
      <form onSubmit={onSubmitInfo}>
        <div className={classes.formInfo}>
          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>{oldPassword}</label>
            <input
              className={classes.contentFormControl}
              name="password"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>{newPassword}</label>
            <input
              className={classes.contentFormControl}
              name="password1"
              type="password"
              onChange={handleChange}
            />
          </div>

          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>{confirmPassword}</label>
            <input
              name="password2"
              className={classes.contentFormControl}
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <input
              className={classes.btnXacnhan}
              type="submit"
              value="Đổi mật khẩu"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
