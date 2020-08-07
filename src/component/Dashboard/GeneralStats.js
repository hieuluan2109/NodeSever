import React, { Component } from 'react';
import CountUp from 'react-countup';
import './style/index.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import PersonIcon from '@material-ui/icons/Person';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FaceIcon from '@material-ui/icons/Face';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CategoryIcon from '@material-ui/icons/Category';
import ExtensionIcon from '@material-ui/icons/Extension';

const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));
export default function GeneralStats(props) {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const classes = useStyles();
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    let countUp = props.data;
    let User = countUp.sinh_vien + countUp.giao_vien;
    let Question = countUp.cau_hoi_tu_luan + countUp.cau_hoi_trac_nghiem;
	return (
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button  onClick={handleClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={<CountUp className="general-stats" prefix="Người dùng: " end={User ? User : 0} duration={5} />} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <FaceIcon />
                    </ListItemIcon>
                    <ListItemText primary={<CountUp className="general-stats" prefix="Sinh viên: " end={countUp.sinh_vien ? countUp.sinh_vien : 0} duration={5} />} />
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <AssignmentIndIcon />
                    </ListItemIcon>
                    <ListItemText primary={<CountUp className="general-stats" prefix="Giáo viên: " end={countUp.giao_vien ? countUp.giao_vien : 0} duration={5} />} />
                </ListItem>
            </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={handleClick2}>
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText primary={<CountUp className="general-stats" prefix="Câu hỏi: " end={Question ? Question : 0} duration={5} />} />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary={<CountUp className="general-stats" prefix="Tự luân: " end={countUp.cau_hoi_tu_luan ? countUp.cau_hoi_tu_luan : 0} duration={5} />} />
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={<CountUp className="general-stats" prefix="Trắc nghiệm: " end={countUp.cau_hoi_trac_nghiem ? countUp.cau_hoi_trac_nghiem : 0} duration={5} />} />
                </ListItem>
            </List>
        </Collapse>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText primary={<CountUp className="general-stats" prefix="Lớp học: " end={countUp.lop_hoc ? countUp.lop_hoc : 0} duration={5} />} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <ExtensionIcon />
          </ListItemIcon>
          <ListItemText primary={<CountUp className="general-stats" prefix="Bài thi: " end={countUp.bai_thi ? countUp.bai_thi : 0} duration={5} />} />
        </ListItem>
        <Divider />
      </List>
	);
}
