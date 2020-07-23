import React, { Component } from 'react'
// import Status from './StatusRequest'
import axios from 'axios'
import Popup from "reactjs-popup";
import ForgotPassword from './ForgotPassword';
import { Redirect } from 'react-router'
import Cookies from 'js-cookie'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        // const token=localStorage.getItem('token');
        // if(token!=null){
        //     this.setState({loggedIn:true})
        // }
        let loggedIn=false
        this.state = {
            email: "",
            password: "",
            Error: "",
            loggedIn ,
            isCookies:false
            // validEmail:"/^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$\/"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
     
    }
    //   handleChanges = (event) => {
    //     this.setState({ password: event.target.value           
    //     });
    //   }
  
    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state
        // POST #1
        axios({
            method: 'post',
            url: 'https://navilearn.herokuapp.com/admin/login',
            data: { email, password }
        }).then(res => {
            Cookies.set('token',res.data.token)
            
            // console.log(res.data.token)
            // localStorage.setItem('token',res.data.token)
            // if(res.data.token!=null){
            //     this.setState({loggedIn:true})
            // }
        
                this.setState({
                    Error: "",
                });
        }).catch((error) => {
            console.log("Lỗi", error.response.data.success)

            if (email.length === 0) {
                this.setState({
                    Error: "Vui lòng nhập email"
                });
            }
            else if (password === "") {
                this.setState({
                    Error: "Vui lòng nhập password"
                });
            }
            else if (password.length <= 6) {
                this.setState({
                    Error: "Password phải từ 6 kí tự"
                });
            } else if (error.response.data.success === false) {
                this.setState({
                    Error: "Email hoặc password không đúng"
                });
            }
            else {
                this.setState({
                    Error: ""
                });
            }
        });
        // const token=localStorage.getItem('token');
        // console.log(token)
        // if(token!=null){
        //     this.setState({loggedIn:true})
        // }
      
    }
  
    render() {
        // const {loggedIn}=this.state;
        // if(localStorage.getItem('token')!=null){
        //     return <Redirect to='/admin' />
        // }
      
            const token=Cookies.get('token');
            console.log(token)
            if(token!=null){
                return <Redirect to='/admin' />
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
                        <input className="iput"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={this.state.name}
                            onChange={this.handleChange}>
                        </input>
                    </div>
                    <div><i id="lock" className="fa fa-lock" > </i> </div>
                    <div>
                        <input className="iput"
                            type="password"
                            placeholder="********"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange} >
                        </input>
                    </div>
                    <div className="checkb"> <input id="checkbox" type="checkbox"></input><label id="remember">Remember me</label> </div>
                    <div>
                        <input type="submit"
                            className="btn"
                            value="Login" />
                    </div>

                </form>

                <Popup trigger={<span id="forgot">Forgot Password</span>} modal>
                    {close => <ForgotPassword close={close} />}
                </Popup>
                
            </div>
        );
    }
}
export default LoginForm;