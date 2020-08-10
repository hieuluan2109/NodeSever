import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import ButtonMenu from './../ButtonMenu'
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LockIcon from "@material-ui/icons/Lock";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import AccountInfo from "./Infomation";
import ChangePassword from "./ChangePassword";
import AlignItemsList from "./Notification";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    marginTop: "33%",
    marginLeft: "5%",
    background: "#f5f6f8",
  },
  root2: {
    width: "100%",
    maxWidth: 300,
    height: "100%",
    marginTop: "40%",
    marginLeft: "5%",
    background: "#FFFF",
  },
  titleformInfo: {
    position: "absolute",
    marginTop: "50px",
    marginLeft: "60px",
    fontSize: 17,
  },
  avatar: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  info: {
    position: "absolute",
    marginLeft: "5%",
  },
  NameSkeleton: {
    marginTop: "1.5%",
    marginLeft: "5%",
    position: "absolute",
    width: "150px",
    height: "30px"
  },
  name: {
    paddingTop: "1.5%",
    marginLeft: "5%",
    position: "absolute",
    width: "150px",
    height: "30px"
  }, 
  left: {
    marginTop: "2%",
  },
  leftInfo: {
    marginLeft: "8%",
    marginTop: "10%",
  }

}));

export default function Inforprofile(props) {
  const classes = useStyles();
  let data;
  const [getTen,setGetTen]=useState('');
  const [item, setItem] = useState(false);
  const token = Cookies.get("token");
  const [titleRight, setTitleRight] = useState(1);
  const TitleValue =(title)=>{
    console.log(props)
    switch(title){
      case 1: return "Thông tin tài khoản";
      case 2: return "Đổi mật khẩu";
      case 3: return "Thông báo";
      default: return "Thông tin tài khoản"
    }
  }
  const HandleTitle =(title)=> {
    setTitleRight(title);
  }
  const HandleContent =()=>{
    switch(titleRight) {
      case 1: return <AccountInfo data={getDataProfile} />
      case 2: return <ChangePassword />
      case 3: return <AlignItemsList />
      default: return <AccountInfo data={getDataProfile} />
    }
  }
  const [getDataProfile, setDataProfile] = useState({ho:'',ten:'',ngay_sinh:''});
  const handleItem =()=> setItem(!item);
  useEffect(() => {
    axios
      .get("https://navilearn.herokuapp.com/admin/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        handleItem()
        data = res.data.data;
        setGetTen(data.ten);
        setDataProfile(data);
      });
  }, []);
  return (
    <div>
      <Grid container
          direction="row"
          justify="center" xs={12} >
        <Grid xs={12} sm={2} className={classes.left} >
          <div className={classes.leftInfo} >
            <Avatar className={classes.avatar} />
            <div className={classes.info}>Tài khoản của</div>
            { getTen
              ? <div className={classes.name}>{getTen}</div>
              : ( <Skeleton animation="wave" className={classes.NameSkeleton} variant="text" /> ) }
          </div> 
          <Paper elevation={3}>
            <div className={classes.root2}>
              <ListItem button onClick={e=> HandleTitle(1)} >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Thông tin tài khoản" />
              </ListItem>
              <ListItem button onClick={e=> HandleTitle(3) }>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Thông báo của tôi" />
              </ListItem>
              <ListItem button onClick={e=> HandleTitle(2) }> 
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Đổi mật khẩu" />
              </ListItem>
              <ListItem button >
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="......" />
              </ListItem>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div className={classes.titleformInfo}>{TitleValue(titleRight)}</div>
          { HandleContent() }
        </Grid>
      </Grid>
    </div>
  );
}
