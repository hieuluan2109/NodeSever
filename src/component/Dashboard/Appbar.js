import React from "react";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import Search from './Search'
import BugReportIcon from "@material-ui/icons/BugReport";
import {makeStyles,Typography,IconButton,Badge} from "@material-ui/core";
import Menus from "../ButtonMenu";
import Appbarnav from "../Appbar";
import MyDrawer from "../Drawer";

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

  return (
    <div >
      <Typography className={classes.title} variant="h6">
        Testing Project
      </Typography>
      <IconButton className={classes.report} size="small">
        Report <BugReportIcon />
      </IconButton>
      <div className={classes.icons}>
        <IconButton aria-label="show 1 new mails" color="inherit">
          <Badge badgeContent={1} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menus />
        <MyDrawer />
      </div>
      <Appbarnav />
    </div>
  );
}
