import React, { useEffect, useState, useRef } from "react";
// import Status from './StatusRequest'
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import queryString from 'query-string'
import { BrowserRouter as Router,useLocation,useHistory, Redirect } from 'react-router-dom'
import Alert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
const useStyles = makeStyles((theme) => ({
  txtLogin: {
    margin: theme.spacing(1),
    width: "40ch",
  },
  form: {
    position: "absolute",
    top: "65%",
    left: "50%",
    transform: "translate(-45%, -50%)",
    width: "400px",
    marginRight: "10%",
    color:'red'
  },
  login: {
    position: "relative",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "600",
  },
  btnLogin: {
  
    fontSize: "100%",
    width: "87%",
    marginTop: "20px",
    marginLeft: "2%",
    height: "50px",
  },
  forgot: {
    marginTop: "20px",
    marginLeft: "57%",
  },
  please: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "30px",
  },
  btnHuybo: {
    fontSize: "100%",
    width: "87%",
    marginTop: "20px",
    marginLeft: "2%",
    height: "50px",
  },link:{textDecoration:'none'}
}));


function ResetPassword (props){

  const classes = useStyles();
  const location = useLocation();
  let params = queryString.parse(location.search);
 const [newpassword,setNewpassword]=useState({code:params.code,password:'',password1:''})
 const [errors,setErrors]=useState('')
 const [success,setSuccess]=useState(false)
 const [error,setError]=useState(false)
 const handleChange = (event) => {
  setNewpassword({
      ...newpassword,[event.target.name]: event.target.value,
      // code:params.code
    });   
  };
 const handleClose=()=>{
   setError(false)
   setErrors('')
   setSuccess(false)
 }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const{code,password1,password}=newpassword
    if(!password||!password1){
      setErrors('Vui lòng nhập đầy đủ thông tin')
      setError(true)
    }else if(password.length<6||password>24){
      setErrors('Độ dài password phải từ 6-24 kí tự')
      setError(true)
    }else if(password!==password1){
      setError(true)
      setErrors('Password không khớp')
    }else{
    axios
    .post("https://navilearn.herokuapp.com/admin/reset-password", {code,password,password1})
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
       setSuccess(true)
       setErrors(res.data.msg)
      }
      else{
        setSuccess(false)
      }
    })
    .catch((err) => {
       console.log(err.response)
      if(err.response.data.success==false){
        setError(true)
        setErrors(err.response.data.msg)
      }
    });
  }
  }
     
    return (
      <div>
        <Paper variant="outlined" className="form">
          <div className={classes.login}>Reset mật khẩu</div>
          <div className={classes.please}>
            Xin chào, Nguyễn Hiếu Luân <br/>Vui lòng điền đầy đủ thông tin bên dưới để reset mật khẩu
          </div>
          {/* <div id="error">{this.state.Error}</div> */}
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Mật khẩu mới"
              type="password"
              name="password"
              // value={password.password1}
              variant="outlined"
              className={classes.txtLogin}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Xác nhận mật khẩu"
              type="password"
              name="password1"
              // value={password.password2}
              variant="outlined"
              className={classes.txtLogin}
              onChange={handleChange}
            />

            <div>
              <Button variant="contained" type='submit' className={classes.btnHuybo} color="primary">
                Xác nhận
              </Button>
            </div>
          </form>
        </Paper>
        <Snackbar
        anchorOrigin={{ vertical: 'right', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={handleClose}
        open={success}>
       <Alert onClose={handleClose} severity="error">
        {errors}
      </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'right', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={handleClose}
        open={error}>
       <Alert onClose={handleClose}  severity="error">
       {errors}
      </Alert>
      </Snackbar>
      </div>
    );
  }
export default withStyles(useStyles, { withTheme: true })(ResetPassword);
