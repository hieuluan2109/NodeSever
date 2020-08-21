import { withStyles,  } from "@material-ui/core/styles";
import React, { Component } from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
// import AvatarEditor from 'react-avatar-editor'
import Avatar from '@material-ui/core/Avatar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Slider from "@material-ui/core/Slider";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import {
  Button,
  Icon,
  TextField,
  Dialog,
  Paper,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

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

  formControl: {
    maxwidth: "400px",
    padding: "10px",
  },
  titleFormControl: {
    width: "90px",
    float: "left",
    paddingTop: "32px",
    marginLeft: "10px",
  },
  contentFormControl: {
    width: "300px",
    borderRadius: "5px",
    height: "30px",
    paddingLeft: "10px",
    marginTop: "15px",
    outline: "none",
    "&:focus": {
      borderColor: "#3f51b5",
    },
  },
  contentNgaysinh: {
    marginTop: "15px",
    marginLeft: "10px",
  },
  gioi_tinh: {
    margin: "20px 10px",
  },
  dialogPaper: {
    minHeight: "60vh",
    maxHeight: "90vh",
    minWidth: "90vh",
    // maxWidth: "170vh",
  },
  btnXacnhan: {
    borderRadius: "5px",
    background: "rgb(253, 216, 53)",
    width: "120px",
    height: "40px",
    marginLeft: "150px",
    cursor: "pointer",
  },
  paper: { marginLeft: "20px" },
  grid5: { marginLeft: "150px" },
  radioSex: { marginLeft: "10px" },
  btnHuy: {
    // borderRadius:'20px',backgroundColor:'rgb(253, 216, 53)'
  },
  btn: { paddingTop: "30px", paddingRight: "217px" },
});

class UploadAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };


  render() {
    const { classes } = this.props;
    const { open, errors, status } = this.state;

    return (
      <div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
        />
        <label htmlFor="icon-button-file">
        <IconButton
            onClick={this.handleClickOpen}
            color="primary"
        >
          <PhotoCamera />
        </IconButton>
      </label>

        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
                Cập nhật hình ảnh
            <div className={classes.selectsort}></div>
          </DialogTitle>

          <DialogContent>
          
          <div className="App">
        <div className="mw400 center" style={{ textAlign: "left" }}>
          Chọn hình ảnh - <UploadPreview />
        </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
class UploadPreview extends React.Component {
    constructor(props) {
      super(props);
      this.state = { file: null };
      this.onChange = this.onChange.bind(this);
      this.resetFile = this.resetFile.bind(this);
    }
    onChange(event) {
      this.setState({
        file: URL.createObjectURL(event.target.files[0])
      });
    }
  
    resetFile(event) {
      event.preventDefault();
      this.setState({ file: null });
    }
    render() {
 
      return (
        <div>
          <input type="file" onChange={this.onChange} />
          {this.state.file && (
            <div style={{ textAlign: "center" }}>
              <button onClick={this.resetFile}>Remove File</button>
            </div>
          )}
          <img style={{ width: "40%" }} src={this.state.file}/>

          <input
            style={{ borderRadius: "5px",
    background: "rgb(253, 216, 53)",
    width: "80px",
    height: "30px",
    marginLeft: "150px",
    cursor: "pointer",
    float:'right',marrginBottom:'10px',
    marginTop:'200px '}}
              type="submit"
              value="Lưu"
            />
        </div>
      );
    }
  }
export default withStyles(styles, { withTheme: true })(UploadAvatar);
