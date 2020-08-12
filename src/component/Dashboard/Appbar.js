import React from "react";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import Search from './Search'
import BugReportIcon from "@material-ui/icons/BugReport";
import {makeStyles,Typography,IconButton,Badge} from "@material-ui/core";
import Menus from "../ButtonMenu";
import Appbarnav from "../Appbar";
import MyDrawer from "../Drawer";
import axios from 'axios'
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // NavLink,
  // useRouteMatch,
  // useParams
} from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    paddingTop: 10,
    paddingLeft: 40,
    color: "black",
    fontWeight: "bold",
  },
  icons: {
    top: 0,
    position: "absolute",
    left: "70%",
  },

  report: {
    position: "absolute",
    fontSize: 17,
    alignItems: "center",
    left: "20%",
    top: "1%",
    color: "black",
    marginTop: 5,
  },
 
}));

export default function Home() {
  const classes = useStyles();
  const [notification, setNotification] = React.useState('1'); 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("https://navilearn.herokuapp.com/admin/notification?alert=true")
      .then((res) => {
        setData(res.data.data)
        setNotification(res.data.data.length)
      })
      .catch((error) => console.log(error))
  }, []);
  const handleClick =(event)=>{
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div >
      <Typography className={classes.title} variant="h6">
      MERN STACK
      </Typography>
      <div className={classes.icons}>
        <IconButton aria-label="show 1 new mails" color="inherit">
          <Badge color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" aria-describedby={id} onClick={handleClick}>
          <Badge badgeContent={notification || 0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menus />
        {/* <MyDrawer /> */}
      </div>
      <Appbarnav />
      <Popover
        id={id}
        transition
        style={{index: 2, position: 'absolute', top: '4%', left: '62%'}}
        onClose={handleClose}
        open={open}
      >
      <div style={{margin: "20px"}}>
        <b>Yêu cầu sửa thông tin</b>
        <Divider />
        {data ? data.map( function(data, index){
          if(index < 5)
            return <Typography style={{marginLeft: "20px"}}><b>.</b> {data.thong_tin_sua.ho + ' ' + data.thong_tin_sua.ten}</Typography>
        }.bind(this))
        : '...' }
      </div>
      <Button onClick={handleClose} style={{left: '65%'}} color="primary" size="small" >
        <p style={{fontSize: "12px", textDecoration: 'underline'}}>Đóng</p></Button>
      </Popover>
    </div>
  );
}
