import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';



const useStyles = makeStyles((theme) => ({
  progressButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  progressWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
    formInfo: {
        marginTop: "10%",
        marginRight: "6%",
        marginLeft: "6%",
        height: "70vh",
        background: "white",
      },
    formControl: {
      paddingTop: "30px",
      paddingLeft: "30px",
      maxwidth: "600px",
    },
    titleFormControl: {
      width: "150px",
      float: "left",
      marginTop: "10px",
    },
    contentFormControl: {
      width: "450px",
      borderRadius: "5px",
      height: "30px",
      outline: "none",
      "&:focus": {
        borderColor: "#3f51b5",
      },
    },
      selectDate: {
        margin: theme.spacing(0.5),
        minWidth: 120,
        marginTop: "-10px",
      },
      selectEmpty: {
        marginTop: theme.spacing(1),
      },
      btnXacnhan: {
        borderRadius: "5px",
        background: "rgb(253, 216, 53)",
        width: "120px",
        height: "40px",
        marginLeft: "150px",
        cursor: "pointer",
      },
      btnHuy: {
        borderRadius: "5px",
        background: "rgb(253, 216, 53)",
        width: "120px",
        height: "40px",
        marginLeft: "10px",
      },
      time: {
        marginBottom: "50px",
      },
      textField: {
        marginTop: "-15px",
        width: 150,
      },
     
    }));

    
export default function AccountInfo() {
const [success, setSuccess] = useState(false)
const [getDataProfile, setDataProfile] = useState({ho:'',ten:'',ngay_sinh:'', gioi_tinh: true, sdt: ''});
const [updateData, setUpdateData] = useState({ho:'',ten:'',ngay_sinh:'', gioi_tinh: true, sdt: ''});
const [onUpdate, setOnUpdate] = useState(false)
const [error, setError] = useState(false);
const [ask, setAsk] = useState(false)
const [gender, setGender] = useState(true)
const token = Cookies.get("token");
const classes = useStyles();
const handleGender =()=>{
  setGender(!gender);
}
const handleChange = (event) => {
  if ( event.target.name == 'gioi_tinh')
      handleGender()
    setUpdateData({
    ...updateData,[event.target.name]: event.target.value,
  })
  console.log(getDataProfile)
};
const Confirm =(event)=>{
  event.preventDefault();
  setAsk(true);
}
useEffect(() => {
  axios
    .get("https://navilearn.herokuapp.com/admin/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setUpdateData(res.data.data);
      setDataProfile(res.data.data);
    });
}, []);
const onSubmitInfo = (event) => {
  event.preventDefault();
  const regexSDT=/((09|03|07|08|05)+([0-9]{8})\b)/g
  let {ho, ten, ngay_sinh, gioi_tinh, sdt} = updateData;
  if ( !ho || !ten || !ngay_sinh ||!regexSDT.test(sdt)){
    setError(true);
    setAsk(false);
  }
  else {
    axios
      .post(
        "https://navilearn.herokuapp.com/admin/profile/update",
        { ho, ten, ngay_sinh, gioi_tinh, sdt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        Cookies.set("ten", ten)
        setOnUpdate(false);
        setSuccess(true);
        setAsk(false);
      })
      .catch((error) => {
        setError(true)
      });
  }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false)
    setSuccess(false);
    setAsk(false);
    if(success)
    window.location.reload()
  };
  const openUpdate =(event)=> {
    event.preventDefault();
    setOnUpdate(true);
  }
  const handleCancel=()=>{
    setSuccess(false);
    setAsk(false);
    setOnUpdate(false);
    setUpdateData(getDataProfile);
  }
  return (
    <div>
    <form onSubmit={ onUpdate ? Confirm : openUpdate }>
        <Paper elevation={3} className={classes.formInfo}>
          <div className={classes.formControl}>
              <label className={classes.titleFormControl}>Họ</label>
              { getDataProfile.ho ? <TextField
                size="small"
                required
                variant="outlined"
                className={classes.contentFormControl}
                name="ho"
                type="text"
                disabled={!onUpdate}
                value={!onUpdate ? getDataProfile.ho : updateData.ho}
                onChange={handleChange}
              />
               : ( <Skeleton animation="wave" className={classes.contentFormControl} variant="text" /> ) }
          </div> 
          <div className={classes.formControl}>
              <label className={classes.titleFormControl}>Tên</label>
              { getDataProfile.ten ? (
                <TextField
                required
                size="small"
                variant="outlined"
                className={classes.contentFormControl}
                name="ten"
                type="text"
                disabled={!onUpdate}
                value={!onUpdate ? getDataProfile.ten : updateData.ten}
                onChange={handleChange}
              /> ) : ( <Skeleton animation="wave" className={classes.contentFormControl} variant="text" /> ) }
          </div> 
           <div className={classes.formControl}>
            <label className={classes.titleFormControl}>Email</label>
            { getDataProfile.email ? (
              <TextField
              size="small"
              required={true}
              variant="outlined"
              name="email"
              className={classes.contentFormControl}
              type="text"
              enabled={onUpdate}
              value={getDataProfile.email}
              disabled={true}
              onChange={handleChange}
            /> ) : ( <Skeleton animation="wave" className={classes.contentFormControl} variant="text" /> ) }
        </div>
        <div className={classes.formControl}>
            <label className={classes.titleFormControl}>Số điện thoại</label>
            { getDataProfile.sdt ? (
              <TextField
              required
              disabled={!onUpdate}
              size="small"
              required={true}
              variant="outlined"
              name="sdt"
              className={classes.contentFormControl}
              type="number"
              value={!onUpdate ? getDataProfile.sdt : updateData.sdt}
              onChange={handleChange}
            /> ) : ( <Skeleton animation="wave" className={classes.contentFormControl} variant="text" /> ) }
        </div>
        <div className={classes.formControl}>
            <label className={classes.titleFormControl}>Giới tính</label>
            { getDataProfile ? (
              onUpdate ?
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gioi_tinh" value={getDataProfile.gioi_tinh} onChange={handleChange}>
                  <FormControlLabel value={true} control={<Radio  checked={gender} />} label="Nam" />
                  <FormControlLabel value={false} control={<Radio checked={!gender} />} label="Nữ" />
                </RadioGroup>
              </FormControl>
              : ( getDataProfile.gioi_tinh ? 
              <div style={{marginTop: "10px"}}>Nam</div> : <div style={{marginTop: "10px"}}>Nữ</div>)
            ) : ( <Skeleton animation="wave" className={classes.contentFormControl} variant="text" /> ) }
        </div>
        <div className={classes.formControl}>
            <label className={classes.titleFormControl}>Ngày sinh</label>
            {getDataProfile.ngay_sinh ? ( <TextField
            id="date"
            type="date"
            name="ngay_sinh"
            onChange={handleChange}
            disabled={!onUpdate}
            value={onUpdate ? updateData.ngay_sinh :getDataProfile.ngay_sinh}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            /> ) : ( <Skeleton animation="wave" className={classes.contentFormControl} variant="text" /> ) }
        </div>
        <div className={classes.formControl} style={{marginTop:'5px'}}>
            <input
              className={classes.btnXacnhan}
              type="submit"
              disabled={getDataProfile.ho ? false : true}
              value={ onUpdate ? "Cập nhật" : "Chỉnh sửa" }
            />
            <input
              className={classes.btnHuy}
              type="button"
              hidden={!onUpdate}
              value="Hủy"
              onClick={handleCancel}
            />
        </div>
        </Paper>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={1500}
        onClose={handleClose}
        open={success}>
      <Alert onClose={handleClose} severity="success">
        Cập nhật thành công
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
        open={ask}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn với quyết định của mình ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
              Hủy
          </Button>
            <Button onClick={onSubmitInfo} color="primary" autoFocus>
               Đồng ý
            </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
