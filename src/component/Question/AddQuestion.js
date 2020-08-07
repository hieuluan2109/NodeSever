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
  formControl: {
    minWidth: "200px",
  },
  formControlCD: {
    paddingTop: "5px",
    paddingBottom: "5px",
  },
});

class AddQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      noi_dung: "",

      chu_de: "",
      mo_ta: "",
      diem: "",
     dap_an_a:'',
     dap_an_b:'',
     dap_an_c:'',
     dap_an_d:'',
      lua_chon: [
        { id: 1, label: "Đáp Án A", value: "" },
        { id: 2, label: "Đáp Án B", value: "" },
        { id: 3, label: "Đáp Án C", value: "" },
        { id: 4, label: "Đáp Án D", value: "" },
      ],
      dap_an: { id: "", value: "" },
      danh_muc: "",
      lc: "Đáp Án A",
      tieu_de: [],
      tieude0: "",
    };
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
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      status: true,
    });
    this.setState({
        lua_chon:[
            {
                id: 1,
                label: "Đáp Án A",
                value:this.state.dap_an_a
              },
            {
                id: 2,
                label: "Đáp Án B",
                value:this.state.dap_an_b
              },
              {
                id: 3,
                label: "Đáp Án C",
                value:this.state.dap_an_c
              },
              {
                id: 4,
                label: "Đáp Án D",
                value:this.state.dap_an_d
              },
          ]
    })
   
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
      danh_muc:this.state.tieude0
    });
    console.log(event.target.value);
  };
  componentWillReceiveProps() {
    this.setState({});
  }
  handleSubmit = (event) => {
    event.preventDefault();
    

    const { noi_dung, danh_muc, dap_an, lua_chon } = this.state;
    var url = "https://navilearn.herokuapp.com/admin/question/create/choice";
    var params = { noi_dung, danh_muc, dap_an, lua_chon };
    axios
      .post(url, params, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((res) => {
        console.log("errors", res.data);
      })
      .catch((error) => {
        console.log("Lỗi", error.response.data);
        this.setState({
          errors: error.response.data.errors,
        });
      });
  };

  render() {
    const { classes, children } = this.props;
    const { open } = this.state;
    // console.log("luachon", this.state.lua_chon[0].value);
    console.log("luachon0", this.state.dap_an_a);
    console.log("luachon1", this.state.dap_an_b);
    console.log("luachon2", this.state.dap_an_c);
    console.log("luachon3", this.state.dap_an_d);
    console.log('ccccccc',this.state.tieude0)
    console.log('ccccccc',this.state.danh_muc)
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
            <div
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              {/* {success} */}
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Nội dung</label>
                <input
                  className={classes.contentFormControl}
                  name="noi_dung"
                  type="text"
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.formControlCD}>
                <label className={classes.titleFormControl}>Chủ đề</label>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Chủ đề</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.tieude0}
                    onChange={this.handleChangeSelection}
                  >
                    {this.state.tieu_de.map((value, index) => (
                      <MenuItem key={index} value={value._id}>
                        {value.tieu_de}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div
                className={classes.formControl}
                style={{ display: this.props.display }}
              >
                <label className={classes.titleFormControl}>Mô tả</label>
                <input
                  className={classes.contentFormControl}
                  name="mo_ta"
                  type="text"
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Điểm</label>
                <input
                  name="diem"
                  className={classes.contentFormControl}
                  type="text"
                  onChange={this.handleChange}
                />
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp Án A</label>
                <input
                  name="dap_an_a"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.state.dap_an_a}
                  onChange={this.handleChange}
                />
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp Án B</label>
                <input
                  name="dap_an_b"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.state.dap_an_b}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp Án C</label>
                <input
                  name="dap_an_c"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.state.dap_an_c}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp Án D</label>
                <input
                  name="dap_an_d"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.state.dap_an_d}
                  onChange={this.handleChange}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Đáp Án</label>
                {/* <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.lc}
                    onChange={this.handleChangeSelection}
                  >
                    <MenuItem value={this.state.lua_chon[0].label}>
                      Đáp án A
                    </MenuItem>
                    <MenuItem value={this.state.lua_chon[1].label}>
                      Đáp án B
                    </MenuItem>
                    <MenuItem value={this.state.lua_chon[2].label}>
                      Đáp án C
                    </MenuItem>
                    <MenuItem value={this.state.lua_chon[3].label}>
                      Đáp án D
                    </MenuItem>
                  </Select>
                </FormControl> */}
              </div>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  onSubmit={this.handleSubmit}
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
