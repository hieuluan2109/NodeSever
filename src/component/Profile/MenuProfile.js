import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LockIcon from "@material-ui/icons/Lock";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import Profile from './Profile'
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,

    marginTop: "33%",
    marginLeft: "5%",
    background: "#f5f6f8",
  },
  avatar: {
    position: "absolute",
    marginTop: "-62px",
    marginLeft: "2%",
    width: 50,
    height: 50,
  },
  info: {
    position: "absolute",
    marginTop: "-55px",
    marginLeft: "7%",
  },
  name: {
    position: "absolute",
    marginTop: "-35px",
    marginLeft: "7%",
  }

}));

export default function MenuProfile(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
 
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
        <Avatar className={classes.avatar} />
        <div className={classes.info}>Tài khoản của</div>
        <div className={classes.name}>{props.ten}</div>
        <div className={classes.root}>
        <Link to="/profile"  style={{textDecoration:'none',color:'black'}}>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Thông tin tài khoản" />
          </ListItem>
          </Link>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Thông báo của tôi" />
          </ListItem>
      
          <Link to="/changepassword"  style={{textDecoration:'none',color:'black'}}>
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3) }
          > 
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Đổi mật khẩu" />
          </ListItem>
          </Link>
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="......" />
          </ListItem>

      </div>
    </div>
  );
}
