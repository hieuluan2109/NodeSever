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

    fontSize: 17,
  },
  formControl: {
    maxwidth: "900px",
    minWidth: "200px",
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
  formControlCD: {
    paddingTop: "10px",
    paddingBottom: "5px",
  },
  DapAn: {
    marginLeft: "110px",
  },
  formControlDA: { marginTop: "25px" },
  formControlDM: { marginLeft: "10px", maxwidth: "900px", minWidth: "200px" },
});
const LUA_CHON = ["Đáp án A", "Đáp án B", "Đáp Án C", "Đáp Án D"];

class AddQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      noi_dung: "",
      danh_muc: "",
      mo_ta: "",
      diem: "",
      dap_an_a: "",
      dap_an_b: "",
      dap_an_c: "",
      dap_an_d: "",
      lua_chon: 0,
      lua_chon_value: 0,
      inputValue: "",
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
      errors: "",
      noi_dung: "",
      danh_muc: "",
      dap_an_a: "",
      dap_an_b: "",
      dap_an_c: "",
      dap_an_d: "",
      lua_chon: "",
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
    // const lua_chon=this.state.lua_chon.toString()
    const {
      noi_dung,
      danh_muc,
      dap_an_a,
      dap_an_b,
      dap_an_c,
      dap_an_d,
      lua_chon,
    } = this.state;

    var url = "https://navilearn.herokuapp.com/admin/question/create/choice";
    var params = {
      noi_dung,
      danh_muc,
      dap_an_a,
      dap_an_b,
      dap_an_c,
      dap_an_d,
      lua_chon,
    };
    if (this.state.isInputValid) {
      axios
        .post(url, params, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((res) => {
          console.log(res.data.success);
          if (res.data.success) {
            this.setState({
              errors: "Thêm thành công",
              noi_dung: "",
              danh_muc: "",
              dap_an_a: "",
              dap_an_b: "",
              dap_an_c: "",
              dap_an_d: "",
              lua_chon: "",
              status: true,
              inputValue: "",
            });
           
          }
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
          this.setState({
            errors: error.response.data.errors,
          });
        });
      return true;
    } else return false;
  };


  
  checkvalidate = () => {
    const {
      noi_dung,
      danh_muc,
      dap_an_a,
      dap_an_b,
      dap_an_c,
      dap_an_d,
      lua_chon,
    } = this.state;
    if (!noi_dung) {
      this.setState({ errors: "Nội dung không được để trống" });
    } else if (noi_dung.length <= 4) {
      this.setState({ errors: "Nội dung quá ngắn" });
    } else if (!danh_muc) {
      this.setState({ errors: "Danh mục không được để trống" });
    } else if (!dap_an_a) {
      this.setState({ errors: "Đáp án A không được để trống" });
    } else if (!dap_an_b) {
      this.setState({ errors: "Đáp án B không được để trống" });
    } else if (!dap_an_c) {
      this.setState({ errors: "Đáp án C không được để trống" });
    } else if (!dap_an_d) {
      this.setState({ errors: "Đáp án D không được để trống" });
    } else if (!lua_chon) {
      this.setState({ errors: "Đáp án không được để trống" });
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
    const {
      open,
      errors,
      noi_dung,
      danh_muc,
      dap_an_a,
      dap_an_b,
      dap_an_c,
      dap_an_d,
      lua_chon,
    } = this.state;
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
                <label className={classes.titleFormControl}>Nội dung</label>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                  name="noi_dung"
                  type="text"
                  value={noi_dung}
                  onChange={this.handleChange}
                  onBlur={this.checkvalidate}
                />
              </div>
              <div className={classes.formControlCD}>
                <label className={classes.titleFormControl}>Danh mục</label>
                <FormControl className={classes.formControlDM}>
                  <InputLabel id="demo-simple-select-label">
                    Danh mục
                  </InputLabel>
                  <Select
                    name="danh_muc"
                    value={danh_muc}
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

              {/* <div className={classes.formControl} style={{ display: this.props.display }}>
                  <label className={classes.titleFormControl}>Mô tả</label>
                  <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                   name="mo_ta"
                   type="text"
                  onChange={this.handleChange}
                 />
                </div>
              */}
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp Án A</label>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                  name="dap_an_a"
                  value={dap_an_a}
                  type="text"
                  onChange={this.handleChange}
                  onBlur={this.checkvalidate}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp Án B</label>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                  name="dap_an_b"
                  value={dap_an_b}
                  type="text"
                  onChange={this.handleChange}
                  onBlur={this.checkvalidate}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp Án C</label>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                  name="dap_an_c"
                  value={dap_an_c}
                  type="text"
                  onChange={this.handleChange}
                  onBlur={this.checkvalidate}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp Án D</label>
                <TextField
                  size="small"
                  variant="outlined"
                  value={dap_an_d}
                  className={classes.contentFormControl}
                  name="dap_an_d"
                  type="text"
                  onChange={this.handleChange}
                  onBlur={this.checkvalidate}
                />
              </div>

              <div className={classes.formControlDA}>
                <label className={classes.titleFormControl}>Đáp Án</label>

                <Autocomplete
                  className={classes.DapAn}
                  // value={this.state.lua_chon_value}
                  onChange={(event, newValue) => {
                    this.setState({
                      lua_chon: LUA_CHON.indexOf(newValue) + 1,
                      lua_chon_value: newValue,
                    });
                  }}
                  id="controllable-states-demo"
                  options={LUA_CHON}
                  style={{ width: 300 }}
                  name="lua_chon"
                  // value={this.state.inputValue}
                  inputValue={this.state.inputValue}
                  onBlur={this.checkvalidate}
                  onInputChange={(event, newInputValue) => {
                    this.setState({ inputValue: newInputValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Đáp Án" variant="outlined" />
                  )}
                />
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
export default withStyles(styles, { withTheme: true })(AddQuestions);
