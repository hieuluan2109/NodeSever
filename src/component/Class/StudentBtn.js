import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  student: {
    width: "100%",
    // maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "35%",
  },
  inline: {
    display: "inline",
  },
  divider: { width: "50%", marginLeft: "25%" },
  ten: {
    paddingTop: "15px",
  },
}));

export default function StudentList(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <div>
      {data == "" ? (
        <div className={classes.student}>Không có SV nào trong lớp học này</div>
      ) : (
        data.map((row, index) => (
          <List>
            <ListItem alignItems="flex-start" className={classes.student}>
              <ListItemAvatar>
                <Avatar alt={row.ten} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={row.ho + " " + row.ten}
                className={classes.ten}
              />
            </ListItem>
            <Divider
              variant="inset"
              component="li"
              className={classes.divider}
            />
          </List>
        ))
      )}
    </div>
  );
}
