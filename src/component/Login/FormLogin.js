import React, { Component } from "react";
// import Status from './StatusRequest'
import axios from "axios";
import Popup from "reactjs-popup";
import ForgotPassword from "./ForgotPassword";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import "../../css/login.scss";
import App from "./../../App";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Link,
} from "react-router-dom";

const styles = (theme) => ({
  txtLogin: {
    margin: theme.spacing(1),
    width: "40ch",
  },
  form: {
    position: "absolute",
    top: "55%",
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
    backgroundColor: "#0B0B61",
    outline: "none",
    padding: "10px",
    borderRadius: "25px",
    fontSize: "100%",
    width: "50%",
    marginTop: "30px",
    marginLeft: "20%",
    height: "50px",
    color: "white",
    cursor:'pointer'
  },
  forgot: {
    marginTop: "20px",
    marginLeft: "57%",
  },link:{textDecoration:'none'}
 
});

class LoginForm extends Component {
  constructor(props) {
    super(props);

    let loggedIn = false;
    this.state = {
      email: "",
      password: "",
      Error: "",
      loggedIn,
      cookie: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  //   handleChanges = (event) => {
  //     this.setState({ password: event.target.value
  //     });
  //   }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    
    axios({
      method: "post",
      url: "https://navilearn.herokuapp.com/login",
      data: { email, password },
    })
      .then((res) => {
        const token = Cookies.set("token", res.data.token);
        Cookies.set("ten", res.data.data[1]);
        Cookies.set("anh_dai_dien", res.data.data[0]);
        this.setState({
          Error: "",
          cookie: token,
        });
      })
      .catch((error) => {
        console.log("Lỗi", error.response.data.success);
        if (email.length === 0) {
          this.setState({
            Error: "Vui lòng nhập email",
          });
        } else if (password === "") {
          this.setState({
            Error: "Vui lòng nhập password",
          });
        } else if (password.length <= 6) {
          this.setState({
            Error: "Password phải từ 6 kí tự",
          });
        } else if (error.response.data.success === false) {
          this.setState({
            Error: "Email hoặc password không đúng",
          });
        } else {
          this.setState({
            Error: "",
          });
        }
      });
  };

  render() {
    const { classes } = this.props;

    if (this.state.cookie != null) {
      return (
        <div>
          {/* <Redirect to="/admin" /> */}
          <App cookie={this.state.cookie} />
        </div>
      );
    }
    
    return (
      <div>
        <Paper variant="outlined" className="form">
          <div className={classes.login}>Đăng Nhập</div>
          <div id="error">{this.state.Error}</div>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              id="outlined-basic"
              label="Email"
              type="Email"
              name="email"
              value={this.state.name}
              variant="outlined"
              className={classes.txtLogin}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Mật khẩu"
              type="password"
              name="password"
              variant="outlined"
              value={this.state.password}
              className={classes.txtLogin}
              onChange={this.handleChange}
            />
            <div className={classes.forgot}><Link to="forgotpassword" className={classes.link}>Quên mật khẩu?</Link></div>
            <div>
              <input
                type="submit"
                className={classes.btnLogin}
                onChange={this.handleChange}
                value="Đăng Nhập"
              />
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}
// export default LoginForm;
export default withStyles(styles, { withTheme: true })(LoginForm);
