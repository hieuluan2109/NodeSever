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
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "90vh",
    height: "100%",
    marginLeft: "10%",
    background: "#FFFF",

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
    overflow: 'auto',
    position: 'relative',
    behavior: 'smooth',
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

export default function Notification() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editData, setEditData] = useState('');
  const [status, setStatus] = useState(false);
  const [action, setAction] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setConfirm(false);
    setSuccess(false);
    setError(false);
  };
  useEffect(() => {
    axios
      .get("https://navilearn.herokuapp.com/admin/notification?alert=true")
      .then((res) => {
        setData(res.data.data)
        let tamp = [];
        res.data.data.map((row, index)=>{
          tamp.push(row.trang_thai)
        })
        setStatus(tamp)
        console.log(res.data.data)
      })
      .catch((error) => console.log(error))
  }, []);
  const handleAccept =(index)=>{
    axios
    .post("https://navilearn.herokuapp.com/admin/user/update-request/accept", data[index])
    .then((res) => {
      handleAcceptSucces(index)
      setSuccess(true)
      setOpen(false);
      setConfirm(false);
    })
    .catch((error) => setError(false))
  }
  const handleDenined =(index)=>{
    axios
    .post("https://navilearn.herokuapp.com/admin/user/update-request/denined", data[index])
    .then((res) => {
      handleAcceptSucces(index)
      setSuccess(true)
      setOpen(false);
      setConfirm(false);
    })
    .catch((error) => setError(false))
  }
  const handleGetUpdateRequest =(index)=>{
    axios
      .get(`https://navilearn.herokuapp.com/admin/user/update-request?id=${data[index]._id}`)
      .then((res) => {
        setEditData(res.data.data.thong_tin_sua)
        setOpen(true)
      })
      .catch((error) => console.log(error))
  }
  const handleAcceptSucces =(index)=>{
    let tamp = status;
    tamp[index] = !status[index];
    setStatus(tamp);
  }
  const handleAction = ()=>{
    switch(action.type){
      case 1: {
        handleAccept(action.index);
        break;
      }
      case 2: {
        handleDenined(action.index);
        break;
      }
      default: handleAccept(action.index);
    }
  }
  const OpenDialog=(type, index)=>{
    setConfirm(true);
    let tamp = {type, index};
    setAction(tamp)
    }
  const listNotifacation =()=>{
    if (data.length == 0)
      return <Typography style={{textAlign: 'center'}} >Không có yêu cầu sửa thông tin nào</Typography>
    else return data.map((row, index)=>(
      <Paper elevation={3} className={classes.listItem} >
      <ListItem alignItems="center" name="button" key={index} disabled={status[index]}>
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
               <div style={{marginLeft: "2%"}}><p>{row.loai == 'SinhVien' ? 'Sinh viên' : 'Giáo viên' }</p></div>
              </Typography>
            </React.Fragment> }/>
            <ListItemSecondaryAction name="button">
              <Grid name={index} style={{marginTop: "35px"}} container direction="column" justify="center">
                <Button disabled={status[index]} onClick={ () => handleGetUpdateRequest(index) } color="primary"> View </Button>
                <Button disabled={status[index]} onClick={() => OpenDialog(1,index) } color="primary"> Xác nhận </Button>
                <Button disabled={status[index]} onClick={() => OpenDialog(2,index) } color="primary"> Hủy </Button>
              </Grid>
            </ListItemSecondaryAction>
        </ListItem>
        <TextField className={classes.content} disabled={status[index]} label="Lý do: " value={row.ly_do}>
        </TextField>
      </Paper>
      ))
  }
  return (
   <div>
    <form>
    <Paper elevation={3} className={classes.formInfo} >
      <List className={classes.root} key="luân">
        { !data
         ? <Skeleton variant="rect" width="100%" height="100%" />
         :  listNotifacation()} 
      </List>
      </Paper>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={handleClose}
        open={success}>
      <Alert onClose={handleClose} severity="success">
        Thành công !!
      </Alert>
    </Snackbar>
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={handleClose}
        open={error}>
      <Alert onClose={handleClose} severity="error">
        Lỗi !! Vui lòng kiểm tra lại
      </Alert>
    </Snackbar>
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
              <p>Bạn có chắc chắn ?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleAction} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">Thông tin sửa</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <Table className={classes.table} aria-label="simple table">
        <Paper elevation={3} style={{width: '50vh'}}>
          <TextField label="Họ và tên " 
            style={{marginLeft: '10px'}}
            id="outlined-size-normal"
            defaultValue="Normal"
            variant="outlined"
            margin="normal"
            width="100%"
            value= {editData.ho+" "+ editData.ten} />
          <br />
          <TextField label="Số điện thoại "
            style={{marginLeft: '10px'}} 
            id="outlined-size-normal"
            defaultValue="Normal"
            variant="outlined"
            margin="normal"
            value= {editData.sdt} />
          <br />
          <TextField label="Giới tính" 
            style={{marginLeft: '10px'}}
            id="outlined-size-normal"
            defaultValue="Normal"
            variant="outlined"
            margin="normal"
            value= {editData.gioi_tinh ? 'Nam' : 'Nữ'} />
          <br />
          <TextField label="Ngày sinh " 
            style={{marginLeft: '10px'}}
            id="outlined-size-normal"
            defaultValue="Normal"
            variant="outlined"
            margin="normal"
            value= {moment(editData.ngay_sinh).format('YYYY-MM-DD')} />
          <br />
        </Paper>
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