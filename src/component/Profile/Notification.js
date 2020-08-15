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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios
      .get("https://navilearn.herokuapp.com/admin/notification")
      .then((res) => {
        setData(res.data.data)
      })
      .catch((error) => console.log(error))
  }, []);
  const OpenDialog=(index)=>{
    axios
      .get(`https://navilearn.herokuapp.com/admin/user/update-request?id=${data[index]._id}`)
      .then((res) => {
        setEditData(res.data.data.thong_tin_sua)
        setOpen(true)
      })
      .catch((error) => console.log(error))
  };
  return (
   <div>
    <form>
    <Paper elevation={3} className={classes.formInfo} >
      <List className={classes.root}>
        { !data
         ? <Skeleton variant="rect" width="100%" height="100%" />
         : data.map((row, index)=>(
        <Paper elevation={3} className={classes.listItem} >
        <ListItem alignItems="center" name="button" key={index} disabled={row.trang_thai}>
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
              <ListItemSecondaryAction name="button">
                <Grid name={index} style={{marginTop: "25px"}} container direction="column" justify="center">
                  <Button disabled={row.trang_thai} name="button" onClick={()=>OpenDialog(index)} color="primary"> View </Button>
                  <Button disabled={row.trang_thai} color="primary"> Xác nhận </Button>
                  <Button disabled={row.trang_thai} color="primary"> Hủy </Button>
                </Grid>
              </ListItemSecondaryAction>
          </ListItem>
          <div className={classes.content} enabled={false}>
              Lý do: {row.ly_do}
          </div>
        </Paper>
        ))}
      </List>
      </Paper>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">Thông tin sửa</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          {/* <div style={{margin: "10px"}}>Tên:   <b>{editData.ho+' '+editData.ten}</b><br/></div>
          <div style={{margin: "10px"}}>Email: <b>{editData.email}</b><br/></div> */}
          <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow key="1">
            <TableCell component="th" scope="row">
              Email: 
            </TableCell>
            <TableCell align="right">{editData.email}</TableCell>
            <TableCell align="right">b</TableCell>
            <TableCell align="right">color</TableCell>
            <TableCell align="right">d</TableCell>
          </TableRow>
        </TableBody>
      </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}