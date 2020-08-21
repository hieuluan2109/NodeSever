// import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import PersonIcon from "@material-ui/icons/Person";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import LockIcon from "@material-ui/icons/Lock";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Avatar from "@material-ui/core/Avatar";
// import Profile from './Profile'
// import { Link } from "react-router-dom";
// import Skeleton from '@material-ui/lab/Skeleton';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 300,
//     height: "100%",
//     marginTop: "40%",
//     marginLeft: "5%",
//     background: "#FFFF",
//   },
//   info: {
//     position: "absolute",
//     marginTop: "-55px",
//     marginLeft: "7%",
//   },
//   name: {
//     position: "absolute",
//     marginTop: "-35px",
//     marginLeft: "7%",
//     width: "150px",
//     height: "30px"
//   }

// }));

// export default function MenuProfile(props) {

//   const classes = useStyles();
//   const [selectedIndex, setSelectedIndex] = React.useState(0);
 
//   const handleListItemClick = (event, index) => {
//     setSelectedIndex(index);
//   };
//   const [item, setItem] = useState(false);
//   const handleItem =()=> setItem(!item);

//   return (
//     <Paper elevation={3}>
//         <div className={classes.root}>
//         <Link to="/profile"  style={{textDecoration:'none',color:'black'}}>
//           <ListItem button >
//             <ListItemIcon>
//               <PersonIcon />
//             </ListItemIcon>
//             <ListItemText primary="Thông tin tài khoản" />
//           </ListItem>
//           </Link>
//           <ListItem button >
//             <ListItemIcon>
//               <NotificationsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Thông báo của tôi" />
//           </ListItem>
      
//           <ListItem button > 
//             <ListItemIcon>
//               <LockIcon />
//             </ListItemIcon>
//             <ListItemText primary="Đổi mật khẩu" />
//           </ListItem>
//           <ListItem button >
//             <ListItemIcon>
//               <DeleteIcon />
//             </ListItemIcon>
//             <ListItemText primary="......" />
//           </ListItem>
//       </div>
//     </Paper>
//   );
// }
