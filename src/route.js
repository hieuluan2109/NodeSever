import React,{Component}from "react";
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
import HomePage from "./view/Home";
import Profile from "./view/Profile";
import Users from "./view/Users";
import StudentList from "./view/Students";
import QuestionsList from "./view/Question";
import Threads from "./view/Thread";
import Cookies from 'js-cookie'
import "./css/appbar.css";
class Routers extends Component {
  constructor(props) {
   
    super(props);
    // const tokens=localStorage.getItem('token');
    // let  loggedIn=true;
    // if(tokens==null){
    //    loggedIn=false
    // }
    // this.state={
    //     loggedIn
    // }
  
    // console.log("c",token)
  }

  render() {
   
    return (
      <BrowserRouter>
        <div>
          <NavLink to="/"></NavLink>
          <NavLink to="/admin"></NavLink>
          <Switch>
            <Route exact path="/">
              <div className="Login">
                <div className="row">
                  <div className="col span-2-of-3"></div>
                  <div className="col span-1-of-3">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </Route>
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
            <Route exact path="/threads">
              <div className="threads">
                <Threads />
              </div>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routers;
