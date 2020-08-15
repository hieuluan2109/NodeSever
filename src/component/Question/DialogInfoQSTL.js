import {
  withStyles,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import Cookies from "js-cookie";

const styles = (theme) => ({
  textField: {
    marginLeft: "100px",
    position: "relative",
    marginTop: "-28px",
  },
  titleformInfo: {
    position: "absolute",
    fontSize: 17,
  },
  formControl: {
    maxwidth: "700px",
  },
  titleFormControlND: {
    width: "100px",
    float: "left",
    marginTop: "105px",
  },
  titleFormControl: {
    width: "100px",
    float: "left",
    paddingTop: "45px",
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
  formControl: {
    minWidth: "200px",
    marginTop: "20px",
  },
  formControlCD: {
    marginTop: "80px",
    marginLeft: "-90px",
    minWidth: "200px",
  },
  titleFormControlCD: {
    width: "100px",
    float: "left",
    paddingTop: "105px",
    marginRight: "100px",
    marginLeft: "-100px",
  },
});

class AddQuestionsTL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: true,
    };
    //   this.handleChange = this.handleChange.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.getDataQuestion(this.props.id);
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes, children } = this.props;
    const { open, errors } = this.state;
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
            <form onSubmit={this.handleSubmit}>
              <div className={classes.formControl}>
                <label className={classes.titleFormControlND}>Nội dung</label>
                <TextField
                  multiline
                  rows={4}
                  name="noi_dung"
                  variant="outlined"
                  value={this.props.noi_dung}
                  className={classes.contentFormControl}
                  disabled={true}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControlCD}>Danh mục</label>
                <FormControl className={classes.formControlCD}>
                  <InputLabel id="demo-simple-select-label">
                    Danh mục
                  </InputLabel>
                  <Select
                    disabled={true}
                    name="danh_muc"
                    value={this.props.danh_muc}
                  ></Select>
                </FormControl>
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Mô tả</label>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                  name="mo_ta"
                  value={this.props.mo_ta}
                  type="text"
                  disabled={true}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Cập nhật</label>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                  name="updatedAt"
                  value={this.props.update}
                  type="text"
                  disabled={true}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Người tạo</label>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                  name="nguoi_tao"
                  value={
                    this.props.ho_nguoi_tao + " " + this.props.ten_nguoi_tao
                  }
                  type="text"
                  disabled={true}
                />
              </div>
              <DialogActions>
                {/* <Button onClick={this.handleClose} color="primary">
                    Hủy bỏ
                  </Button> */}
                <Button
                  // type="submit"
                  color="primary"
                  onClick={this.handleClose}
                >
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
export default withStyles(styles, { withTheme: true })(AddQuestionsTL);
