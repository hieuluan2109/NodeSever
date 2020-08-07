import React, { Component } from "react";
import App from './../../App'

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
          <App token={false} />
        </div>
      );
  
  }
}
export default Logout;
