import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

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
  },
  nested0: {
    height: "10px",
  },
  accord: { background: "#ececec" },
  list: { display: "block" },
 
}));

export default function QuestionInList(props) {
  const classes = useStyles();
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  console.log(data.dsCauHoi, "Cauhoi");
  return (
    <div>
      {data == "" ? (
        <div className={classes.student}>
          Không có câu hỏi nào trong bài thi này     
        </div>
      ) : (
        data.dsCauHoi.map((row, index) => (
          <List
            key={index}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.listItem}
          >
            {row.loai == "TracNghiem" ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.accord}
                >
             
                  {/* <ListItem> */}
                  <ListItemText
                    primary={row.cau_hoi_id.noi_dung}
                    className={classes.nested0}
                  />
                  {/* </ListItem> */}
                </AccordionSummary>
                <AccordionDetails className={classes.list}>
                  {row.cau_hoi_id.lua_chon.map((row1, value1) => (
                    <ul>
                      <ListItemText primary={row1.label + ": " + row1.value} />
                    </ul>
                   
                  ))}
                  {!row.cau_hoi_id.dap_an ? (
                    " "
                  ) : (
                    <ListItemText
                      primary={"Đáp Án: " + row.cau_hoi_id.dap_an.value}
                     
                    />
                  )}
                </AccordionDetails>
              </Accordion>
            ) : (
              <Accordion>
                <AccordionSummary className={classes.accord}>
                  {/* <ListItem> */}
                  <ListItemText
                    primary={row.cau_hoi_id.noi_dung}
                    className={classes.nested0}
                  />
                  {/* </ListItem> */}
                </AccordionSummary>
              </Accordion>
            )}

            {/* <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={row.cau_hoi_id.noi_dung} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary={row.loai=='TuLuan'?'Loại: Tự Luận':'Loại: Trắc Nghiệm'} />
          </ListItem>
          
        </List>
      </Collapse> */}
          </List>
        ))
      )}
    </div>
  );
}
