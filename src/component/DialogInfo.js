import { withStyles } from "@material-ui/core/styles";
import React, { Component, Fragment } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Loading from './Loading';
import StudentCharts from './Users/DetailInfoStudent';
import moment from "moment";
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
    width: "120px",
    float: "left",
    paddingTop: "32px",
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
    minHeight: "90vh",
    maxHeight: "90vh",
    minWidth: "170vh",
    // maxWidth: "170vh",
  },
  paper: { marginLeft: "20px" },
  grid5: { marginLeft: "150px" },
  grid1:{marginBottom:'20px'},
  radioSex: { marginLeft: "10px" },
  btnHuy: {
    // borderRadius:'20px',backgroundColor:'rgb(253, 216, 53)'
  },
  btn: { paddingTop: "30px", paddingRight: "217px" },
});

class DialogInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errors: "",
      status: false,
      loading: true,
      stats: {
        count: 0,
        bai_thi: 0,
        bai_tap: 0,
        data: [],
      },
      showStats: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.onClickInfor(this.props.id, this.props.age);
  };
  handleClose = () => {
    this.setState({ open: false, errors: "", status: false });
    this.props.setError();
    this.props.handleClose();
  };
  CheckValid = () => {
    const regexp = /[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
    const regSDT = /((09|03|07|08|05)+([0-9]{8})\b)/g;
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
    if (this.props.Data.ho == "") {
      this.setState({ errors: "Họ không được bỏ trống", status: true });
    } else if (!regexp.test(this.props.Data.ho)) {
      this.setState({ errors: "Họ không hợp lệ", status: true });
    } else if (this.props.Data.sdt == "") {
      this.setState({ errors: "Số điện thoại không được bỏ trống" });
    } else if (!regSDT.test(this.props.Data.sdt)) {
      this.setState({ errors: "Số điện thoại không hợp lệ" });
    } else if (this.props.Data.ten == "") {
      this.setState({ errors: "Tên không được bỏ trống", status: true });
    } else if (!regexp.test(this.props.Data.ten)) {
      this.setState({ errors: "Họ không hợp lệ", status: true });
    } else if (this.props.Data.ngay_sinh >= getToday) {
      this.setState({ errors: "Ngày sinh không hợp lệ", status: true });
    } else {
      this.setState({ errors: "", status: false });
    }
  };
  teacherStats =(classes)=>{
    this.setState({
      showStats: !this.state.showStats,
    })
    let result;
    axios.get(
      `https://navilearn.herokuapp.com/admin/stats/class-belong-teacher?id=${this.props.id}`
    ).then(res=>{
      result = res.data;
      this.setState({
        stats: res.data
      })
    })
  }
 
  creater =(classes)=>{
    return (
      <div>
      <div className={classes.formControl}>
        <label className={classes.titleFormControl}>Người tạo</label>
        <TextField
          size="small"
          name="nguoi_tao_id"
          variant="outlined"
          className={classes.contentFormControl}
          type="text"
          value={this.props.name.fname + " " + this.props.name.lname}
          disabled={true}
        />
      </div>
      <div className={classes.formControl}>
        <label className={classes.titleFormControl}>Ngày tạo</label>
        <TextField
          size="small"
          name="ngay_tao"
          variant="outlined"
          className={classes.contentFormControl}
          type="text"
          value={this.props.Data.createdAt}
          disabled={true}
        />
      </div>
     
            <div className={classes.formControl}>
        <label className={classes.titleFormControl}>Cập nhật</label>
        <TextField
          size="small"
          name="update"
          variant="outlined"
          className={classes.contentFormControl}
          type="text"
          value={this.props.Data.updatedAt}
          disabled={true}
        />
      </div>
      {/* <div className={classes.formControl}>
        <label className={classes.titleFormControl}>Trạng thái</label>
      <FormControl >
     
        <Select className={classes.formControl}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.props.Data.trang_thai}
          onChange={this.props.handleChange}
          disabled={this.props.status}
        >
          <MenuItem value={true}>Enable</MenuItem>
          <MenuItem value={false}>Disable</MenuItem>
        </Select>
      </FormControl>
      </div> */}
      {/* <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Ngày sinh</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Fragment>
                    <DatePicker
                      className={classes.contentFormControl}
                      onBlur={this.CheckValid}
                      format="yyyy/MM/dd"
                      name="ngay_sinh"
                      disabled={this.props.status}
                      onChange={this.props.handleDateChange}
                      value={this.props.Data.ngay_sinh || moment(new Date()).subtract('1','days')}
                    />
                  </Fragment>
                </MuiPickersUtilsProvider>
              </div> */}




      <div hidden={!this.state.showStats} className={classes.formControl}>
        <label className={classes.titleFormControl}>Số bài lớp:</label>
        <TextField
          size="small"
          name="update"
          variant="outlined"
          className={classes.contentFormControl}
          type="text"
          value={this.state.stats.count}
          disabled={true}
        />
      </div>
      <div hidden={!this.state.showStats} className={classes.formControl}>
        <label className={classes.titleFormControl}>Số bài thi:</label>
        <TextField
          size="small"
          name="update"
          variant="outlined"
          className={classes.contentFormControl}
          type="text"
          value={this.state.stats.bai_thi}
          disabled={true}
        />
      </div>
      <div hidden={!this.state.showStats} className={classes.formControl}>
        <label className={classes.titleFormControl}>Số bài tập:</label>
        <TextField
          size="small"
          name="update"
          variant="outlined"
          className={classes.contentFormControl}
          type="text"
          value={this.state.stats.bai_tap}
          disabled={true}
        />
      </div>
      </div>
    )
  }
  renderAvatar=()=>{
    const uri =[
      'http://anstudying.herokuapp.com/api/file/avatar/', 
      'http://navilearn-student-b.herokuapp.com/api/v1/lay-anh-dai-dien/'
    ];
    if (this.props.age)
      return <Avatar src={uri[0]+this.props.Data.anh_dai_dien} style={{marginTop: "2.5vh", marginLeft: '18vh', width:'10vh', height:'10vh'}} alt={this.props.Data.ho+' '+this.props.Data.ten}/>
    else return <Avatar src={uri[1]+this.props.id} style={{marginTop: "2.5vh", marginLeft: '18vh', width:'10vh', height:'10vh'}} alt={this.props.Data.ho+' '+this.props.Data.ten} />
  }
  render() {
    const { classes } = this.props;
    const { open, errors, status } = this.state;
    console.log(this.props.Data)
    return (
      <div>
        <IconButton
          name="icon"
          size="small"
          className={classes.eyes}
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          {this.props.icon}
        </IconButton>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Thông Tin {this.props.age ? this.props.title : " Sinh Viên"}
          </DialogTitle>
          <span style={{ textAlign: "center", color: "red" }}>
            {errors}
            {this.props.success}
          </span>
          <DialogContent>
            {/* <div ><Loading /></div> */}
            <form onSubmit={this.props.onSubmit}>
            <Grid container>
                <Grid item xs={6} className={classes.grid1}>
                <div className={classes.formControl}>
                  <label className={classes.titleFormControl}>Ảnh đại diện</label>
                  {this.renderAvatar()}
                </div>
                <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Họ</label>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                  name="ho"
                  value={this.props.Data.ho}
                  type="text"
                  onChange={this.props.handleChange}
                  onKeyUp={this.CheckValid}
                  disabled={this.props.status}
                />
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Tên</label>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.contentFormControl}
                  name="ho"
                  type="text"
                  value={this.props.Data.ten}
                  disabled={this.props.status}
                  onChange={this.props.handleChange}
                  onKeyUp={this.CheckValid}
                />
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Email</label>
                <TextField
                  size="small"
                  name="email"
                  variant="outlined"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.props.Data.email}
                  disabled={true}
                  onChange={this.props.handleChange}
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Ngày sinh</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Fragment>
                    <DatePicker
                      className={classes.contentFormControl}
                      onBlur={this.CheckValid}
                      format="yyyy/MM/dd"
                      name="ngay_sinh"
                      disabled={this.props.status}
                      onChange={this.props.handleDateChange}
                      value={this.props.Data.ngay_sinh || moment(new Date()).subtract('1','days')}
                    />
                  </Fragment>
                </MuiPickersUtilsProvider>
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>
                  Số điện thoại
                </label>
                <TextField
                  size="small"
                  name="sdt"
                  variant="outlined"
                  className={classes.contentFormControl}
                  type="number"
                  value={this.props.Data.sdt}
                  disabled={this.props.status}
                  onChange={this.props.handleChange}
                  onKeyUp={this.CheckValid}
                />
              </div>

              <div className={classes.formControl}>
                <label className={classes.titleFormControl}>Giới tính</label>
                <TextField
                  size="small"
                  name="gioi_tinh"
                  variant="outlined"
                  className={classes.contentFormControl}
                  type="text"
                  value={this.props.Data.gioi_tinh ? "Nam" : "Nữ"}
                  disabled={true}
                  onChange={this.props.handleChange}
                />
              </div>

              { this.props.age == true ? '' : (
                  this.props.status==true ?
                  this.creater(classes) : '') }
            </Grid>
            <Grid item xs={6} className={classes.grid2}>
              { this.props.age == true ? this.creater(classes) : (
                  this.props.status==true ?
                  <StudentCharts id={this.props.id} /> : this.creater(classes)) }
              {/* { this.props.age == true ? ( this.props.status==true ?
                  <div className={classes.formControl}>
                    <label className={classes.titleFormControl}></label>
                    <Button
                      style={{}}
                      variant="outlined"
                      color="primary"
                      onClick={()=>this.teacherStats(classes)}>
                        Xem thống kê
                    </Button>
                </div> : '')
               : ''} */}
              <DialogActions>
                {/* <Button onClick={this.handleClose} color="primary"    style={{ display: this.props.age == true ? "block" : "none"}}>
              Hủy bỏ
            </Button> */}
            { this.props.age == 1 ? ( this.props.status==true ?
                    <Button
                      style={{position:'relative',marginRight:'25%',marginTop:'30px'}}
                      color="primary"
                      size="small"
                      onClick={()=>this.teacherStats(classes)}>
                        Xem thống kê
                    </Button>: '')
               : ''}
                <Button
                  name="btnXacNhan"
                  size="small"
                  style={{position:'relative',marginRight:'25%',marginTop:'30px'}}
                  type={this.props.type}
                  onClick={this.props.status ? this.handleClose : ""}
                  color="primary"
                  disabled={this.props.status ? "" : status}
                >
                {this.props.status?  'Đóng':'Cập nhật'}
                </Button>
              </DialogActions>
              </Grid>
              </Grid>
            </form>
           
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogInfo);
