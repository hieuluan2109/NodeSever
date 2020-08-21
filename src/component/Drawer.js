// import { withStyles } from "@material-ui/core/styles";
// import React, { Component } from "react";
// import clsx from "clsx";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
// import SettingsIcon from "@material-ui/icons/Settings";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import {Drawer,IconButton,List,ListItemIcon,ListItemText,ListItem,Divider} from "@material-ui/core";
// const drawerWidth = 240;
// const styles = (theme) => ({
//   menuButton: {
//     position: "abosulute",
//     left: "120px",
//     marginRight: theme.spacing(2),
//   },
//   hide: {
//     display: "none",
//   },
//   drawer: {
//     paddingRight: 40,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     background: "#ececec",
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     // display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: "flex-end",
//   },
//   drawer: {
//     position: "absolute",
//     top: "0px",
//     left: "100px",
//   },
// });

// class MyDrawer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//     };
//   }
//   toggleDrawer = () => {
//     this.state.open
//       ? this.setState({ open: false })
//       : this.setState({ open: true });
//   };
//   render() {
//     const { classes } = this.props;
//     const { open} = this.state;

//     return (
//       <div className={classes.drawer}>
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           onClick={this.toggleDrawer}
//           className={clsx(classes.menuButton, open && classes.hide)}
//         >
//           <SettingsIcon/>
//         </IconButton>
//         <Drawer
//           className={classes.drawer}
//           variant="persistent"
//           anchor="right"
//           open={open}
//           classes={{
//             paper: classes.drawerPaper,
//           }}
//         >
//           <div className={classes.drawerHeader}>
//             <IconButton onClick={this.toggleDrawer}>
//              <ChevronRightIcon />
//             </IconButton>
//           </div>
//           <Divider />
//           <List>
//             {["Người Dùng", "Câu Hỏi", "Chủ Đề", "Bài Kiểm Tra"].map(
//               (text, index) => (
//                 <ListItem button key={text} onClick={this.toggleDrawer}>
//                   <ListItemIcon>
//                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                   </ListItemIcon>
//                   <ListItemText primary={text} />
//                 </ListItem>
//               )
//             )}
//           </List>
//           <Divider />
//           <List>
//             {["All mail", "Trash", "Spam"].map((text, index) => (
//               <ListItem button key={text} onClick={this.toggleDrawer}>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>
//       </div>
//     );
//   }
// }

// export default withStyles(styles, { withTheme: true })(MyDrawer);
