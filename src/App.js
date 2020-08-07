import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  // Link,
  NavLink,
  Redirect,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import LoginForm from "./component/Login/Login_Form";
import Header from "./view/Home";
import Profile from "./view/Profile";
import Users from "./view/Users";
import StudentList from "./view/Students";
import QuestionsList from "./view/Question";
import Topic from "./view/Topic";
import Cookies from "js-cookie";
import ChangePassword from './view/ChangPasswordAdmin'
import LoginV from "./view/Login";
import HomePage from './view/HomePage'
import "./css/appbar.css";
import "./css/login.scss";
<<<<<<< HEAD
import Logout from "./component/Login/Logout";
import ClassRoom from './view/ClassRoom'
import Routers from "./route";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: this.props.cookie,
    };
  }
=======
import Routers from './route'

>>>>>>> 66526cf2a918d8f8799ff773a7ba5f3f31f6ba78

class App extends Component {
 
  render() {
    const token = Cookies.get("token");

    if (token!=null) {
      return (
        <BrowserRouter>
     
          <Route exact path="/" render={() => <Redirect to="/admin" />} />
          
          <Switch>
            <Route exact path="/admin">
              <div className="admin">
                <HomePage />
              </div>
            </Route>
            <Route exact path="/profile">
              <div className="profile">
                <Profile />
              </div>
            </Route>
            <Route exact path="/users">
              <div className="users">
                <Users />
              </div>
            </Route>
            <Route exact path="/students">
              <div className="students">
                <StudentList />
              </div>
            </Route>
            <Route exact path="/questions">
              <div className="questions">
                <QuestionsList />
              </div>
            </Route>
            <Route exact path="/topic">
              <div className="topic">
                <Topic />
              </div>
            </Route>
            <Route exact path="/changepassword">
              <div className="changepassword">
                <ChangePassword />
              </div>
            </Route>
            <Route exact path="/logout">
              <div className="logout">
                <Logout />
              </div>
            </Route>
            <Route exact path="/classroom">
              <div className="classroom">
                <ClassRoom />
              </div>
            </Route>
          </Switch>
          
        </BrowserRouter>
      )
    } else {
      return (
        
        <BrowserRouter>
           
           <Route  path="/" render={() => <Redirect to="/" />} />
           {/* <Route exact path="/">
            <div className="Login">
              <LoginV />
            </div>
          </Route>  */}
          {/* <Switch> */}
     
          <Route exact path="/">
            <div className="Login">
              <LoginV />
            </div>
          </Route> 
          <Route exact path="/admin">
            <div className="admin">
              <HomePage />
            </div>
          </Route>
          {/* </Switch> */}
          
        
         
        </BrowserRouter>
      );
    }
  }
}
export default App;
