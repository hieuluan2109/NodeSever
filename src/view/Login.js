import React from 'react'
import LoginForm from '../component/Login/Login_Form'
import Forgot from '../component/Login/ForgotPassword'
import { Redirect } from "react-router";
import Cookies from "js-cookie";


    function Login() {
       
        return (
            <div>
           <LoginForm />
            </div>
      
        );
      }
      
      export default Login;
