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
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";

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
    maxwidth: "700px",
  },
  titleFormControl: {
    width: "100px",
    float: "left",
    paddingTop: "32px",
  },
  contentFormControl: {
    width: "400px",
    borderRadius: "5px",
    height: "30px",
    paddingLeft: "10px",
    marginTop: "25px",
    outline: "none",
    "&:focus": {
      borderColor: "#3f51b5",
    },
  },
  ngaysinh: {
    position: "absolute",
    marginTop: "30px",
  },
  contentNgaysinh: {
    marginTop: "5px",
    marginLeft: "100px",
  },
 
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
    this.props.getDataQuestionInfor(this.props.id)
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  

  render() {
    const { classes, dapan,noidung,diem,chude,luachona,luachonb,luachonc,luachond,nguoitao,mota } = this.props;
    const { open } = this.state;

    return (
      <div>
        <IconButton
          size="small"
          className={classes.eyes}
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          {this.props.icon}
        </IconButton>

      
       
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
            
          <DialogContent>
            <form>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Nội dung</label>
                <input
                  className={classes.contentFormControl}
                  name="noidung"
                  type="text"
                  value={noidung}
                  disabled={this.props.status}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Chủ đề</label>
                <input
                  className={classes.contentFormControl}
                  name="chude"
                  type="text"
                  value={chude}
                  disabled={this.props.status}
                />
              </div>
              
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp án A</label>
                <input
                  className={classes.contentFormControl}
                  name="dap_an_a"
                  type="text"
                  value={luachona}
                  disabled={this.props.status}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp án B</label>
                <input
                  className={classes.contentFormControl}
                  name="dap_an_b"
                  type="text"
                  value={luachonb}
                  disabled={this.props.status}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp án C</label>
                <input
                  className={classes.contentFormControl}
                  name="dap_an_c"
                  type="text"
                  value={luachonc}
                  disabled={this.props.status}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp án D</label>
                <input
                  className={classes.contentFormControl}
                  name="dap_an_d"
                  type="text"
                  value={luachond}
                  disabled={this.props.status}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp án</label>
                <input
                  className={classes.contentFormControl}
                  name="dap_an"
                  type="text"
                  value={dapan}
                  disabled={this.props.status}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Người Tạo</label>
                <input
                  className={classes.contentFormControl}
                  name="nguoitao"
                  type="text"
                  value={nguoitao}
                  disabled={this.props.status}
                />
              </div>

            
              <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary">
              Hủy bỏ
            </Button> */}
            <Button  onClick={this.handleClose} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
            </form>
          </DialogContent>

        
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogInfo);
