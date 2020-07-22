import * as types from "./../constants/actionTypes";
const initialstate = {
  login: {
    isAuthenticated: false,
    token: null,
    redirect: false,
    email: "",
    password: "",
    Error: "",
  },
};

var myReducer = (state = initialstate, action) => {
  switch (action.type) {
    case types.LOGIN:
      console.log(action);
      var { isAuthenticated, token, redirect,email,password,Error } = action.login;
      return {
        login: {
          isAuthenticated: isAuthenticated,
          token: token,
          redirect: redirect,
          email:email,
          password:password,
          Error:Error
        },
      };
    default:
      return state;
  }
};

export default myReducer;
