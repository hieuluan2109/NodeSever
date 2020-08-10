import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Skeleton from '@material-ui/lab/Skeleton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "90vh",
    height: "100%",
    marginLeft: "10%",
    background: "#FFFF",
    overflow: 'auto',
    position: 'relative',
    height: '70vh',
    behavior: 'smooth',
    overflow: 'auto'
  },
  inline: {
    display: 'inline',
  },
  formInfo: {
    marginTop: "10%",
    marginRight: "6%",
    marginLeft: "6%",
    height: "70vh",
    background: "white",
  },
  content: {
    marginLeft: "20px",
    paddingBottom: "20px",
    fontFamily: "Arial, sans-serif"
  },
  listItem: {
    margin: "20px",
    "&:hover":{
      backgroundColor: "#DCDCDC"
    },
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();
  const [data, setData] = useState('');
  useEffect(() => {
    axios
      .get("https://navilearn.herokuapp.com/admin/notification")
      .then((res) => {
        setData(res.data.data)
        console.log(res.data.data)
      });
  }, []);
  return (
    // <div styles={{ height: '500px', overflowY: 'scroll' }} >
    <form>
    <Paper elevation={3} className={classes.formInfo} >
      <List className={classes.root}>
        { !data
         ? <Skeleton variant="rect" width="100%" height="100%" />
         : data.map((row, index)=>(
        <Paper elevation={3} className={classes.listItem} >
        <ListItem alignItems="center" key={index}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={row.nguoi_dung_id.anh_dai_dien} />
          </ListItemAvatar>
          <ListItemText
            primary={row.nguoi_dung_id.ho + ' ' +row.nguoi_dung_id.ten}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                 <div style={{marginLeft: "2%"}}>{row.loai == 'SinhVien' ? 'Sinh viên' : 'Giáo viên' }</div>
                </Typography>
              </React.Fragment> }/>
              <ListItemSecondaryAction>
                <Grid style={{marginTop: "25px"}} container direction="column" justify="center">
                  <Button color="primary"> View </Button>
                  <Button color="primary"> Xác nhận </Button>
                  <Button color="primary"> Hủy </Button>
                </Grid>
              </ListItemSecondaryAction>
          </ListItem>
          <div className={classes.content}>
              Lý do: {row.ly_do}
          </div>
        </Paper>
        ))}
      </List>
      </Paper>
      </form>
    // </div>
  );
}