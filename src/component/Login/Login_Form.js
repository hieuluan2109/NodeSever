import React, { Component } from "react";
// import Status from './StatusRequest'
import axios from "axios";
import Popup from "reactjs-popup";
import ForgotPassword from "./ForgotPassword";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import '../../css/login.scss' 
import App from './../../App'

class LoginForm extends Component {
  constructor(props) {
    super(props);

    let loggedIn = false;
    this.state = {
      email: "",
      password: "",
      Error: "",
      loggedIn,
      cookie:null
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
        const token=Cookies.set("token", res.data.token);
        this.setState({
          Error: "",
          cookie:token
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
  

    if (this.state.cookie != null) {
      return (
      <div>
        {/* <Redirect to="/admin" /> */}
        <App cookie={this.state.cookie} />
      </div>
      )
    }
   

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form">
          <h2 className="login"> Login </h2>
          <div id="error">{this.state.Error}</div>
          <div>
            <i id="user" className="fas fa-user"></i>
          </div>
          <div>
            <input
              className="iput"
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.name}
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <i id="lock" className="fa fa-lock">
              {" "}
            </i>{" "}
          </div>
          <div>
            <input
              className="iput"
              type="password"
              placeholder="********"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="checkb">
            {" "}
            <input id="checkbox" type="checkbox"></input>
            <label id="remember">Remember me</label>{" "}
          </div>
          <div>
            <input type="submit" className="btn" value="Login" />
          </div>
        </form>

        <Popup trigger={<span id="forgot">Forgot Password</span>} modal>
          {(close) => <ForgotPassword close={close} />}
        </Popup>
      </div>
    );
  }
}
export default LoginForm;
