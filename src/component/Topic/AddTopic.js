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
});

class AddTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
        tieu_de:'',
        mo_ta:'',
        status:true,
        errors:''
    };
  }
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({
      open: false,
      errors:'', 
      tieu_de:'',
      mo_ta:'',
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      status: true
    });
  };
  checkvalidate=()=>{
    const {tieu_de,mo_ta}=this.state
    if(tieu_de==''){
        this.setState({errors:'Tiêu đề không được để trống'})
    }
    else if(mo_ta==''){
        this.setState({errors:'Mô tả không được để trống'})
    }else{
        this.setState({
            errors:'',
            status:false
        })}
  }
  componentWillReceiveProps (){
  
    this.setState({
    mo_ta:'',
    tieu_de:'',
    errors: "",
    })
}
  
  handleSubmit = (event) => {
    event.preventDefault();
    const {tieu_de,mo_ta}=this.state
    axios.post(
        'https://navilearn.herokuapp.com/admin/category/create',
        {tieu_de,mo_ta},
        {headers:{ Authorization: `Bearer ${this.props.token}` }}
    ).then((res)=>{
        console.log(res.data)
        this.setState({errors:'Thêm danh mục thành công',
                            tieu_de:'',
                            mo_ta:'',status:true
    })
    }).catch((error)=>{
        console.log(error.response.data)
        this.setState({errors:error.response.data.errors})
    })
  
  };

  render() {
    const { classes, children } = this.props;
    const { open, errors, success, status,tieu_de,mo_ta } = this.state;
    // const { ho, ten, email, password,ngaysinh } = this.state;
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
            Thêm mới danh mục
            <div className={classes.selectsort}></div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Để tạo danh mục, vui lòng điền đầy đủ các thông tin
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
                <label className={classes.titleFormControl}>Tên danh mục</label>
                <input
                  className={classes.contentFormControl}
                  name="tieu_de"
                  type="text"
                  value={tieu_de}
                  onChange={this.handleChange}
                  onBlur={this.checkvalidate}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Mô tả</label>
                <input
                  className={classes.contentFormControl}
                  name="mo_ta"
                  type="text"
                  value={mo_ta}
                  onChange={this.handleChange}
                  onBlur={this.checkvalidate}
                />
              </div>
             
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Hủy bỏ
                </Button>
                <Button type="submit" color="primary"  disabled={status}>
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

export default withStyles(styles, { withTheme: true })(AddTopic);
