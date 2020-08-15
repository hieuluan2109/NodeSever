import React from 'react'
import LoginForm from '../component/Login/Login_Form'
import FormLogin from '../component/Login/FormLogin'
import Forgot from '../component/Login/ForgotPassword'
import { Redirect } from "react-router";
import Cookies from "js-cookie";


    function Login() {
       
        return (
            <div>
           {/* <LoginForm /> */}
           <FormLogin />
            </div>
      
        );
      }
      
      export default Login;
