import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SelectSort from "./SelectSort";
import axios from "axios";
import Cookies from "js-cookie";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, Icon, TextField, Dialog, Paper, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
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

  textField: {
    marginLeft: "100px",
    position: "relative",
    marginTop: "-28px",
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
  contentNgaysinh: {
    marginTop: "5px",
    marginLeft: "5px",
  },
});

class DialogThem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ho: "",
      ten: "",
      email: "",
      ngay_sinh: "",
      password: "",
      confirmpassword: "",
      errors: "",
      ma_sv: "",
      isInputValid: false,
      success: "",
      status: true,
      gioi_tinh: true,
      sdt: '',
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({
      open: false,
      ho: "",
      ten: "",
      email: "",
      ngay_sinh: "",
      password: "",
      confirmpassword: "",
      errors: "",
      ma_sv: "",
      isInputValid: false,
      success: "",
      gioi_tinh: true,
      sdt: "",
    }); 
  };
  handleChange = (event) => {
    if ( event.target.name == "gioi_tinh"){
      this.setState({ 
        gioi_tinh: !this.state.gioi_tinh
      })
    }
    else {
      this.setState({
        [event.target.name]: event.target.value,
        status: true
      });
    }
    console.log(this.state)
  };
  checkvalid = () => {
    const regexp = /[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựýỳỵỷỹ]+$/;
    const regexE = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    const regMSSV=/^\d{10}$/
    const regSDT=/((09|03|07|08|05)+([0-9]{8})\b)/g
    const regpassword=/^(?=.*[0-9])(?=.*[A-Z]).{6,24}$/
    let today = new Date();
    let getdate = today.getDate();
    let getmonth = today.getMonth() + 1;
    let getyear = today.getFullYear();
    if (getdate < 10) {
      getdate = "0" + getdate;
    }
    if (getmonth < 10) {
      getmonth = "0" + getmonth;
    }
    // today=today()
    const getToday = getyear + "-" + getmonth + "-" + getdate;

    if (this.state.ho == "") {
      this.setState({ errors: "Vui lòng nhập họ" });
    } else if (!regexp.test(this.state.ho)) {
      this.setState({ errors: "Họ không hợp lệ" });
    } else if (this.state.ten == "") {
      this.setState({ errors: "Vui lòng nhập tên" });
    } else if (!regexp.test(this.state.ten)) {
      this.setState({ errors: "Tên không hợp lệ" });
    } else if (this.props.value == false && this.state.ma_sv == "") {
      this.setState({ errors: "Vui lòng nhập MSSV" });
    } else if (this.props.value == false && !regMSSV.test(this.state.ma_sv)) {
      this.setState({ errors: "Mã số SV phải = 10 kí tự số" });
    } else if (this.state.email == "") {
      this.setState({ errors: "Vui lòng nhập Email" });
    } else if (!regexE.test(this.state.email)) {
      this.setState({ errors: "Email không hợp lệ" });
    } else if (this.state.ngay_sinh == "") {
      this.setState({ errors: "Vui lòng chọn ngày sinh" });
    } else if (this.state.ngay_sinh >= getToday) {
      this.setState({ errors: "Ngày sinh không hợp lệ" });
    }else if (this.state.sdt == "") {
      this.setState({ errors: "Vui lòng nhập số điện thoại" });
    } else if (!regSDT.test(this.state.sdt)) {
      this.setState({ errors: "Số điện thoại không hợp lệ" });
    } 
    else if (this.state.password == "") {
      this.setState({ errors: "Vui lòng nhập mật khẩu" });
    }
    else if (regpassword.test(this.state.password)==false){
      this.setState({ errors: "Password phải từ 6-24 kí tự, có ít nhất 1 chữ in hoa" });
    } else if (this.state.confirmpassword == "") {
      this.setState({ errors: "Vui lòng xác nhận mật khẩu" });
    } else if (this.state.password != this.state.confirmpassword) {
      this.setState({ errors: "Password không khớp" });
    } else {
      this.setState({
        errors: "",
        isInputValid: true,
        status: false,
      });
      return true
    }
    return false
  };

  componentWillReceiveProps (){
  
      this.setState({
      ho: "",
      ten: "",
      email: "",
      ngay_sinh: "",
      password: "",
      confirmpassword: "",
      errors: "",
      ma_sv: "",
      gioi_tinh: true,
      sdt: "",
      })
    
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.isInputValid) {
      const { ho, ten, email, ma_sv, password, ngay_sinh, sdt, gioi_tinh } = this.state;
      console.log(this.props.token);
      var url = "";
      this.props.value == true
        ? (url = "https://navilearn.herokuapp.com/admin/user/add/teacher")
        : (url = "https://navilearn.herokuapp.com/admin/user/add/student");
      var params;
      this.props.value == true
        ? (params = { ho, ten, email, ngay_sinh, password, sdt, gioi_tinh })
        : (params = { ho, ten, email, ma_sv, ngay_sinh, password, sdt, gioi_tinh});
      console.log(params);
      axios
        .post(url, params, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((res) => {
          console.log("AAA", res.data.errors);
          if (res.data.success == true) {
            this.setState({
              ho: "",
              ten: "",
              email: "",
              ngay_sinh: "",
              password: "",
              confirmpassword: "",
              // errors: "",
              ma_sv: "",
              isInputValid: false,
              errors: "Thêm thành công",
            });
          }
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data.errors);
          // this.setState({
          //   errors: error.response.data.errors,
          // });
        });
      return true;
    } else return false;
  };

  render() {
    // const regpassword=/^(?=.*[0-9])(?=.*[a-z]).{6,24}$/
    // const regpassword=/^(?=.*[0-9])(?=.*[A-Z]).{6,24}$/
    const { classes, children } = this.props;
    const { open, errors, success, status } = this.state;
    // const { ho, ten, email, password,ngaysinh } = this.state;
  
    return (
      <div>
        <Button 
          name='icon-addCircle'
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
            <div className={classes.selectsort}>{children}</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Để tạo tài khoản, vui lòng điền đầy đủ các thông tin
            </DialogContentText>
            <div
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              {" "}
              {errors}
              {/* {success} */}
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Họ</label>
                <input
                  className={classes.contentFormControl}
                  name="ho"
                  type="text"
                  value={this.state.ho}
                  onChange={this.handleChange}
                  onBlur={this.checkvalid}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Tên</label>
                <input
                  className={classes.contentFormControl}
                  name="ten"
                  type="text"
                  value={this.state.ten}
                  onChange={this.handleChange}
                  onBlur={this.checkvalid}
                />
              </div>
              <div
                className={classes.formControl}
                style={{ display: this.props.display }}
              >
                <label className={classes.titleFormControl}>MSSV</label>
                <input
                  className={classes.contentFormControl}
                  name="ma_sv"
                  type="text"
                  value={this.state.ma_sv}
                  onChange={this.handleChange}
                  onBlur={this.checkvalid}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Email</label>
                <input
                  name="email"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                  onBlur={this.checkvalid}
                />
              </div>

              <div className={classes.formControl}>
               <label className={classes.titleFormControl}>Ngày sinh</label>
              <TextField
                name="ngay_sinh"
                label="Birthday"
                type="date"
                value={this.state.ngay_sinh}
                className={classes.contentNgaysinh}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                onBlur={this.checkvalid}
              />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>SĐT</label>
                <input
                  name="sdt"
                  className={classes.contentFormControl}
                  type="number"
                  value={this.state.sdt}
                  onChange={this.handleChange}
                  onBlur={this.checkvalid}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Giới tính</label>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="gioi_tinh" value={this.state.gioi_tinh} onChange={this.handleChange}>
                    <FormControlLabel value={true} control={<Radio  checked={this.state.gioi_tinh} />} label="Nam" />
                    <FormControlLabel value={false} control={<Radio checked={!this.state.gioi_tinh} />} label="Nữ" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Mật khẩu</label>
                <input
                  name="password"
                  className={classes.contentFormControl}
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  onBlur={this.checkvalid}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>
                  Xác nhận mật khẩu
                </label>
                <input
                  name="confirmpassword"
                  className={classes.contentFormControl}
                  type="password"
                  value={this.state.confirmpassword}
                  onChange={this.handleChange}
                  onBlur={this.checkvalid}
                />
              </div>
              <DialogActions>
                <Button name='btnHuy' onClick={this.handleClose} color="primary">
                  Hủy bỏ
                </Button>
                <Button name='btnXNhan' type="submit" color="primary" disabled={status}>
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

export default withStyles(styles, { withTheme: true })(DialogThem);
