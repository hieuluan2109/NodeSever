import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@material-ui/core/Icon";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SelectSort from "./SelectSort";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme) => ({
  btnThem: {
    position: "absolute",
    right: "7%",
    marginTop: "15px",
    borderRadius: "5px",
    background: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      background: theme.palette.primary.light,
    },
  },
  selectsort: {
    position: "absolute",
    top: "10px",
    right: "25px",
  },
  formInfo: {
    marginTop: "107px",
    marginRight: "6%",
    marginLeft: "6%",
    height: "70vh",
    background: "white",
  },
  titleformInfo: {
    position: "absolute",
    marginTop: "65px",
    marginLeft: 60,
    fontSize: 17,
  },
  formControl: {
    maxwidth: "600px",
  },
  titleFormControl: {
    width: "30px",
    float: "left",
    marginTop:'25px',
    marginRight:'35px',
  },
  contentFormControl: {
    width: "400px",
    borderRadius: "5px",
    height: "30px",
    paddingLeft: "10px",
    marginTop:'20px',
    outline: "none",
    "&:focus": {
      borderColor: "#3f51b5",
    },
  },
  //    iconbtnThem:{
  //     // background:theme.palette.primary.light,
  //     color:'white',
  //     '&:hover':{
  //         color:theme.palette.primary.light,
  //         background:'white',
  //         fontWeight:500
  //     }
  // }
});

class DialogInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  //   handleChangSelect = (event) => {
  //     this.setState({role:event.target.value});
  //   };

  render() {
    console.log("aaa", this.state.value);
    const { classes, children } = this.props;
    const { open } = this.state;
    console.log(this.state.user);
    return (
      <div>
        <IconButton
          size="small"
          className={classes.eyes}
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          <VisibilityIcon
            onClick={() =>
              this.props.onClickInfor(this.props.id, this.props.age)
            }
          />
        </IconButton>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Thông tin tài khoản</DialogTitle>
      
          <DialogContent>
          <form>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Họ</label>
                <input
                  className={classes.contentFormControl}
                  name="ho"
                  type="text"
                  value={this.props.Data.ho}
                  disabled={true}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Tên</label>
                <input
                  className={classes.contentFormControl}
                  name="ten"
                  type="text"
                  value={this.props.Data.ten}
                  disabled={true}
                />
              </div>
              {/* <div className={classes.formControl}>
              <label className={classes.titleFormControl}>Số điện thoại</label>
              <input
                className={classes.contentFormControl}
                type="text"
                value={state.phoneNumber}
                onChange={handleChange}
              />
            </div> */}
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Email</label>
                <input
                  name="email"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.props.Data.email}
                  disabled={true}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Ngày sinh</label>
                <input
                  name="ngaysinh"
                  className={classes.contentFormControl}
                  type="text"
                  value=""
                  disabled={true}
                />
              </div>
            
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Người tạo</label>
                <input
                  name="nguoitao"
                  className={classes.contentFormControl}
                  type="text"
                  value=""
                  disabled={true}
                />
              </div>
           
            {/* Đia chỉ Email
            <TextField
              autoFocus
              margin="dense"
              id="email"
              value={this.props.Data.email}
              type="email"
              fullWidth
            />
            Họ{" "}
            <TextField
              margin="dense"
              id="firstname"
              type="text"
              value={this.props.Data.ho}
              fullWidth
            />
            Tên
            <TextField
              margin="dense"
              id="lastname"
              value={this.props.Data.ten}
              type="text"
              fullWidth
            />
            Ngày sinh
            <TextField margin="dense" id="ngaysinh" type="text" fullWidth />
            Người Tạo
            <TextField
              margin="dense"
              id="password"
              value={this.props.Data.nguoi_tao_id}
              type="text"
              fullWidth
            /> */}
            </form>
          </DialogContent>
       
          <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary">
              Hủy bỏ
            </Button> */}
            <Button onClick={this.handleClose} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogInfo);
