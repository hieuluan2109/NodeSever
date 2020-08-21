import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Cookies, { set } from "js-cookie";
import Paper from '@material-ui/core/Paper';
import $ from 'jquery';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
    marginTop: "10%",
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
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  btnXacnhan: {
    borderRadius: "5px",
    background: "rgb(253, 216, 53)",
    marginTop: "10px",
    width: "120px",
    height: "40px",
    marginLeft: "170px",
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
  $(document).ready(function(){
    $("#password1, #password2").keyup(function(){
        if ($("#password1").val() != $("#password2").val()) {
          setConfirmPassword(true)
        }else{
          setConfirmPassword(false)
        }
      });
    });
  $(document).ready(function(){
    $("#password").keyup(function(){
        if ($("#password").val().length < 6 || $("#password").val().length > 24)
          setOldPassword(true)
        else { 
          setOldPassword(false)
        }
      })
    });
    $(document).ready(function(){
      $("#password1, #password").keyup(function(){
          if ($("#password1").val().length < 6 || $("#password1").val().length > 24)
            setNewPassword(true)
          else if ($("#password").val() == $("#password1").val())
            setNewPassword(true)
          else { 
            setNewPassword(false)
          }
        })
      });
  const [message, setMessage] = useState("Mật khẩu cũ không đúng");
  const classes = useStyles();
  const [getPassword, setGetPassword] = useState({password:'',password1:'',password2:''});
  const token = Cookies.get("token");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(true);
  const [newPassword, setNewPassword] = useState(false);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false);
  const [enable, setEnable] = useState(false);
  const handleChange = (event) => {
    if ( getPassword.password2 != getPassword.password1)
      setConfirmPassword(true);
    else
      setConfirmPassword(false);
      setGetPassword({
      ...getPassword,[event.target.name]: event.target.value,
    });
  };
  const onSubmitInfo = (event) => {
    event.preventDefault();
    const {password,password1,password2}=getPassword
    axios
      .post(
        "https://navilearn.herokuapp.com/admin/changepassword",
        { password, password1,password2},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setSuccess(true);
      })
      .catch((error) => {
        setError(true)
        error.response.data.errors[0].msg ? setMessage(error.response.data.errors[0].msg) : setMessage(error.response.data.errors)
      });
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway')
      return;
    if ( success )
      window.location.reload()
    setError(false)
    setSuccess(false);
  };
  return (
    <div>
      <form onSubmit={onSubmitInfo}>
        <Paper elevation={3} className={classes.formInfo}>
          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>Mật khẩu cũ</label>
            <TextField
              autoFocus={true}
              size="small"
              error = {oldPassword}
              variant="outlined"
              className={classes.contentFormControl}
              name="password"
              type="password"
              id="password"
              helperText={oldPassword ? "Mật khẩu phải từ 6-24 kí tự" : ""}
              required={true}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>Mật khẩu mới</label>
            <TextField
              error = {newPassword}
              size="small"
              variant="outlined"
              className={classes.contentFormControl}
              name="password1"
              id="password1"
              type="password"
              helperText={newPassword ? "Mật khẩu phải từ 6-24 kí tự  và không được trùng mật khẩu cũ" : ""}
              required={true}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>Nhập lại mật khẩu</label>
            <TextField
              error ={ confirmPassword ? true : false }
              size="small"
              variant="outlined"
              name="password2"
              id="password2"
              required={true}
              className={classes.contentFormControl}
              type="password"
              helperText={confirmPassword ? "Mật khẩu không trùng khớp" : ""}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <input
              className={classes.btnXacnhan}
              disabled={ !(!confirmPassword && !oldPassword && !newPassword)  }
              type="submit"
              value="Đổi mật khẩu"
            />
          </div>
        </Paper>
    </form>
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={handleClose}
        open={success}>
      <Alert onClose={handleClose} severity="success">
        Cập nhật thành công
      </Alert>
    </Snackbar>
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={handleClose}
        open={error}>
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  </div>
  );
}
