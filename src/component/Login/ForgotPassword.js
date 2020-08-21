import React, { Component } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import ForgotPassword from "./ForgotPassword";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import Alert from "@material-ui/lab/Alert";
import "../../css/login.scss";
import App from "./../../App";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Sentmail from './SentMail'
import Snackbar from '@material-ui/core/Snackbar';
const styles = (theme) => ({
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
  },
  link: { textDecoration: "none" },
});

class Forgot extends Component {
  constructor(props) {
    super(props);

    let loggedIn = false;
    this.state = {
      email: "",
      password: "",
      error: false,
      loggedIn,
      cookie: null,
      success: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleClose=()=>{
    this.setState({error:false})
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const regexE = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    const { email } = this.state;
    if(!email){
      this.setState({error:true,message:'Email không được để trống'})
    }else if(!regexE.test(email)){
      this.setState({error:true,message:'Email không hợp lệ'})
    }
    else {axios
      .post("https://navilearn.herokuapp.com/admin/forgot-password", { email })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          this.setState({ success: true });
        }
        else{
          this.setState({success:false})
        }
      })
      .catch((err) => {
        console.log(err.response.data.msg)
        if(!err.success){
        this.setState({error:true,message:err.response.data.msg})
        console.log("Lỗi", err.response.data.msg);
        }
      });
    }
  };

  resentPassword=()=>{
    this.setState({
      success:false
    })
  }
  render() {
    const { classes } = this.props;
    const { success } = this.state;
   
    return (
      <div>
        {!success ? 
        <Paper variant="outlined" className="form">
          <div className={classes.login}>Quên mật khẩu?</div>
          <div className={classes.please}>
            Vui lòng nhập email đã đăng ký và kiểm tra hộp thư
          </div>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              id="outlined-basic"
              label="Email"
              type="Email"
              name="email"
              variant="outlined"
              className={classes.txtLogin}
              onChange={this.handleChange}
            />

            <div>
              <Button
                variant="contained"
                className={classes.btnLogin}
                color="primary"
                type="submit"
              >
                Tiếp tục
              </Button>
              <Link to="/" className={classes.link}>
                {" "}
                <Button
                  variant="contained"
                  className={classes.btnHuybo}
                  color="primary"
                >
                  Hủy bỏ
                </Button>
              </Link>
            </div>
          </form>
        </Paper>:<Sentmail resentMail={this.resentPassword}/>}
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={this.handleClose}
        open={this.state.error}>
      <Alert onClose={this.handleClose} severity="error">
        {this.state.message}
      </Alert>
      </Snackbar>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Forgot);

