import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Accordion from "@material-ui/core/Accordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
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
  listItem: {
    width: "100%",
  },
  nested: {
    paddingLeft: theme.spacing(10),
    background: "#ececec"
  },
 
  accord: { background: "#ececec" },
  list: { display: "block" },
}));

export default function StudentTested(props) {
  const classes = useStyles();
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      {data.dsSV_dathi == "" ? (
        <div className={classes.student}>Không có SV nào đã thi</div>
      ) : (
        data.dsSV_dathi.map((row, index) => (
          <List
            key={index}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.listItem}
          >
            {
              
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                  primary={row.ho + " " + row.ten}
                  className={classes.nested0}
                />
                  </ListItem>
                </List>
            }
          </List>
        ))
      )}
    </div>
  );
}
