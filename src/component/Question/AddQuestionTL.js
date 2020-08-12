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
import Icon from "@material-ui/core/Icon";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";

import axios from "axios";
import Cookies from "js-cookie";

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
      noi_dung: "",
      danh_muc: "",
      mo_ta: "",
      tieu_de: [],
      tieude0: "",
      errors: "",
      isInputValid: false,
      status: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
    axios
      .get("https://navilearn.herokuapp.com/admin/category/list", {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((res) => {
        const { data } = res.data;
        this.setState({ tieu_de: res.data.data });
        this.setState({ tieude0: data[0]._id });
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  };
  handleClose = () => {
    this.setState({
      open: false,
      errors:'', 
      noi_dung:'',
      danh_muc:'',
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      status: true,
    });
  };

  handleChangeValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      status: true,
    });
  };
  handleChangeSelection = (event) => {
    this.setState({
      lc: (event.target.name = event.target.value),
      tieude0: (event.target.name = event.target.value),
      danh_muc: this.state.tieude0,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.isInputValid) {
      const { noi_dung, danh_muc } = this.state;
      var url = "https://navilearn.herokuapp.com/admin/question/create/assay";
      var params = {
        noi_dung,
        danh_muc,
      };

      axios
        .post(url, params, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((res) => {
          console.log("errors", res.data);
          // this.setState({errors:res.data.msg})
          if (res.data.success) {
            this.setState({ errors: res.data.msg, noi_dung:"", danh_muc: "",  status: true });
          }
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
          this.setState({
            errors: error.response.data.errors[0].msg,
          });
        });
      return true;
    } else return false;
  };

  checkvalidate = () => {
    const { noi_dung, danh_muc } = this.state;
    if (!noi_dung) {
      this.setState({ errors: "Nội dung không được để trống" });
    } else if (noi_dung.length <= 4) {
      this.setState({ errors: "Danh mục quá ngắn" });
    } else if (!danh_muc) {
      this.setState({ errors: "Danh mục không được để trống" });
    } else {
      this.setState({
        errors: "",
        status: false,
        isInputValid: true,
      });
      return true;
    }
    return false;
  };
  render() {
    const { classes, children } = this.props;
    const { open, errors } = this.state;
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
            Thêm mới câu hỏi
            <div className={classes.selectsort}>{children}</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Để tạo câu hỏi, vui lòng điền đầy đủ các thông tin
            </DialogContentText>
            <div style={{ textAlign: "center", color: "red" }}>{errors}</div>

            <form onSubmit={this.handleSubmit}>
              <div className={classes.formControl}>
                <label className={classes.titleFormControlND}>Nội dung</label>
                <TextField
                  multiline
                  rows={4}
                  name="noi_dung"
                  variant="outlined"
                  value={this.state.noi_dung}
                  onChange={this.handleChange}
                  className={classes.contentFormControl}
                  onBlur={this.checkvalidate}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControlCD}>Danh mục</label>
                <FormControl className={classes.formControlCD}>
                  <InputLabel id="demo-simple-select-label">
                    Danh mục
                  </InputLabel>
                  <Select
                    name="danh_muc"
                    value={this.state.danh_muc}
                    // onChange={this.handleChangeSelection}
                    onChange={this.handleChange}
                    onBlur={this.checkvalidate}
                  >
                    {this.state.tieu_de.map((value, index) => (
                      <MenuItem key={index} value={value._id}>
                        {value.tieu_de}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={this.state.status}
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
