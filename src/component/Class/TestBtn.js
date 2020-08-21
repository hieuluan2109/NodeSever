import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {List,ListItem,Divider,ListItemText} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },

  inline: {
    display: "inline",
  },
  divider: { margin: "left" },
}));

export default function HomeWorkList(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <div>
      {data == "" ? (
        <div className={classes.student}>
          Không có bài thi nào trong lớp học này
        </div>
      ) : (
        data.map((row, index) => (
          <List>
            <ListItem alignItems="flex-start" className={classes.student}>
              <ListItemText primary={row.tieu_de} className={classes.ten} />
            </ListItem>
            <Divider />
          </List>
        ))
      )}
    </div>
  );
}
