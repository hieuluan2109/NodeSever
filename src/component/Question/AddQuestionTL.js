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
      fontSize: 17,
    },
    formControl: {
      maxwidth: "700px",
    },
    titleFormControlND:{
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
      marginTop:'20px'
    },
    formControlCD: {
      marginTop: "80px",
      marginLeft: "-90px",
     minWidth:'200px',
    },
    titleFormControlCD: {
      width: "100px",
      float: "left",
      paddingTop: "105px",
      marginRight:'100px',
      marginLeft:'-100px'
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
        tieu_de:[],
        tieude0: "",
        errors:''
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
      const {
        noi_dung,
        danh_muc,
        mo_ta,
  
      } = this.state;
      var url = "https://navilearn.herokuapp.com/admin/question/create/assay";
      var params = {
        noi_dung,
        danh_muc,
        mo_ta,
       
      };
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
              ></div>
  
              <form onSubmit={this.handleSubmit}>
                <div className={classes.formControl}>
                  <label className={classes.titleFormControlND}>Nội dung</label>
                  <TextField  
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={this.handleChange}
                    className={classes.contentFormControl}
                  />
               
                </div>

                
                <div className={classes.formControl}>
                  <label className={classes.titleFormControlCD}>Danh mục</label>
                  <FormControl className={classes.formControlCD}>
                    <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                    <Select
                      name="danh_muc"
                      value={this.state.danh_muc}
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
               
                <div className={classes.formControl}>
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
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Hủy bỏ
                  </Button>
                  <Button type="submit" color="primary">
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
  