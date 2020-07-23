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

class DialogThem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value:this.props.value
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
    console.log("aaa",this.state.value)
    const { classes,children } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button
          className={classes.btnThem}
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          <AddCircleIcon className={classes.iconbtnThem} />
          Thêm
        </Button>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Thêm mới tài khoản
            
            <div className={classes.selectsort}>    
                  {children} 
            </div>

          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Để tạo tài khoản, vui lòng điền đầy đủ các thông tin
            </DialogContentText>
            

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Địa chỉ Email"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="firstname"
              label="Họ"
              type="text"
              fullWidth
            />
               <TextField
              margin="dense"
              id="lastname"
              label="Tên"
              type="text"
              fullWidth
            />

            <TextField
              margin="dense"
              id="password"
              label="Mật khẩu"
              type="password"
              fullWidth
            />
            <TextField
              margin="dense"
              id="repassword"
              label="Xác nhận mật khẩu"
              type="password"
              fullWidth
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Hủy bỏ
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogThem);
