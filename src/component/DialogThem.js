import {withStyles} from "@material-ui/core/styles";
import React, {Component, Fragment} from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import {DatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import Skeleton from '@material-ui/lab/Skeleton';
import {MuiPickersUtilsProvider, KeyboardTimePicker} from "@material-ui/pickers";
import {
    Button,
    Icon,
    TextField,
    Dialog,
    Paper,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
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
            background: theme.palette.primary.light
        }
    },

    formControl: {
        maxwidth: "400px",
        padding: "10px"
    },
    titleFormControl: {
        width: "90px",
        float: "left",
        paddingTop: "32px",
        marginLeft: "10px"
    },
    contentFormControl: {
        width: "300px",
        borderRadius: "5px",
        height: "30px",
        paddingLeft: "10px",
        marginTop: "15px",
        outline: "none",
        "&:focus": {
            borderColor: "#3f51b5"
        }
    },
    contentNgaysinh: {
        marginTop: "15px",
        marginLeft: "10px"
    },
    gioi_tinh: {
        margin: "20px 10px"
    },
    dialogPaper: {
        minHeight: "80vh",
        maxHeight: "90vh",
        minWidth: "170vh",
        // maxWidth: "170vh",
    },
    paper: {
        marginLeft: "20px"
    },
    grid5: {
        marginLeft: "150px"
    },
    radioSex: {
        marginLeft: "10px"
    },
  contentNgaysinh: {
    marginTop: "15px",
    marginLeft: "10px",
  },
  gioi_tinh: {
    margin: "20px 10px"
  },
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "90vh",
    minWidth: "170vh",
    // maxWidth: "170vh",
  },
  paper: { marginLeft: "20px" },
  radioSex: { marginLeft: "10px" },
  btnHuy: {
  
  },
  btn: { paddingTop: "30px", paddingRight: "200px" },
});

class DialogThem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            ho: "",
            ten: "",
            email: "",
            ngay_sinh: new Date(),
            password: "",
            confirmpassword: "",
            errors: "",
            ma_sv: "",
            isInputValid: false,
            success: false,
            status: true,
            gioi_tinh: true,
            sdt: "",
            error1: ''
        };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({
            open: false,
            ho: "",
            ten: "",
            email: "",
            ngay_sinh: new Date(),
            password: "",
            confirmpassword: "",
            errors: "",
            ma_sv: "",
            isInputValid: false,
            success: false,
            gioi_tinh: true,
            error: false,
            error1: '',
            sdt: ""
        });
    };
    handleChange = (event) => {
        if (event.target.name == "gioi_tinh") {
            this.setState({
                gioi_tinh: !this.state.gioi_tinh
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value,
                status: true
            });
        }
    };
    checkvalid = () => {
        const regexp = /[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựýỳỵỷỹ]+$/;
        const regexE = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
        const regMSSV = /^\d{10}$/;
        const regSDT = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const regpassword = /^(?=.*[0-9])(?=.*[A-Z]).{6,24}$/;

        const {
            ho,
            ten,
            ma_sv,
            ngay_sinh,
            email,
            sdt,
            password,
            confirmpassword
        } = this.state;
        const {value} = this.props;
        if (!ho) {
            this.setState({errors: "Vui lòng nhập họ"});
        } else if (!regexp.test(ho)) {
            this.setState({errors: "Họ không hợp lệ"});
        } else if (!ten) {
            this.setState({errors: "Vui lòng nhập tên"});
        } else if (!regexp.test(ten)) {
            this.setState({errors: "Tên không hợp lệ"});
        } else if (value == false && !ma_sv) {
            this.setState({errors: "Vui lòng nhập MSSV"});
        } else if (value == false && !regMSSV.test(ma_sv)) {
            this.setState({errors: "Mã số SV phải = 10 kí tự số"});
        } else if (!email) {
            this.setState({errors: "Vui lòng nhập Email"});
        } else if (!regexE.test(this.state.email)) {
            this.setState({errors: "Email không hợp lệ"});
        } else if (this.state.ngay_sinh == "") {
            this.setState({errors: "Vui lòng chọn ngày sinh"});
        } else if (moment(ngay_sinh).format("YYYY-MM-DD") >= moment(new Date()).format("YYYY-MM-DD")) {
            this.setState({errors: "Ngày sinh không hợp lệ"});
        } else if (!sdt) {
            this.setState({errors: "Vui lòng nhập số điện thoại"});
        } else if (!regSDT.test(sdt)) {
            this.setState({errors: "Số điện thoại không hợp lệ"});
        } else if (this.state.password == "") {
            this.setState({errors: "Vui lòng nhập mật khẩu"});
        } else if (!regpassword.test(password)) {
            this.setState(
                {errors: "Password phải từ 6-24 kí tự và có ít nhất 1 chữ in hoa"}
            );
        } else if (!confirmpassword) {
            this.setState({errors: "Vui lòng xác nhận mật khẩu"});
        } else if (password !== confirmpassword) {
            this.setState({errors: "Password không khớp"});
        } else {
            this.setState({errors: "", isInputValid: true, status: false});
            return true;
        }
        return false;
    };

    componentWillReceiveProps() {
        this.setState({
            ho: "",
            ten: "",
            email: "",
            ngay_sinh: new Date(),
            password: "",
            confirmpassword: "",
            errors: "",
            ma_sv: "",
            gioi_tinh: true,
            sdt: ""
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.isInputValid) {
            const {
                ho,
                ten,
                email,
                ma_sv,
                password,
                sdt,
                gioi_tinh
            } = this.state;
            let {ngay_sinh} = this.state;
            ngay_sinh = moment(ngay_sinh).format("YYYY-MM-DD");
            console.log(this.props.token);
            var url = "";
            this.props.value == true
                ? (url = "https://navilearn.herokuapp.com/admin/user/add/teacher")
                : (url = "https://navilearn.herokuapp.com/admin/user/add/student");
            var params;
            this.props.value == true
                ? (params = {
                    ho,
                    ten,
                    email,
                    ngay_sinh,
                    password,
                    sdt,
                    gioi_tinh
                })
                : (params = {
                    ho,
                    ten,
                    email,
                    ma_sv,
                    ngay_sinh,
                    password,
                    sdt,
                    gioi_tinh
                });

            axios
                .post(url, params, {
                    headers: {
                        Authorization: `Bearer ${this.props.token}`
                    }
                })
                .then((res) => {
                    if (res.data.success == true) {
                        this.setState({
                            ho: "",
                            ten: "",
                            email: "",
                            ngay_sinh: new Date(),
                            password: "",
                            confirmpassword: "",
                            sdt: "",
                            // errors: "",
                            ma_sv: "",
                            isInputValid: false,
                            error1: "Thêm thành công",
                            gioi_tinh: true,
                            status: true,
                            success: true
                        });
                    }
                    // else {   this.setState({ error: true }); }
                })
                .catch((error) => {
                    console.log("Lỗi", error.response.data);
                    this.setState({error: true, error1: error.response.data.errors});
                });
            return true;
        } else 
            return false;
        }
    ;
    handleDateChange = (date) => {
        this.setState({
            ngay_sinh: date.getFullYear() + "-" + (
                date.getMonth() + 1
            ) + "-" + date.getDate()
        });
    };

    render() {
        const {classes, children} = this.props;
        const {open, errors, success, status, error} = this.state;

        return (
            <div>
                <Button
                    name="icon-addCircle"
                    className={classes.btnThem}
                    variant="outlined"
                    onClick={this.handleClickOpen}>
                    <AddCircleIcon className={classes.iconbtnThem}/>
                    Thêm
                </Button>

                <Dialog
                    classes={{
                        paper: classes.dialogPaper
                    }}
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        Thêm mới tài khoản
                        <div className={classes.selectsort}>{children}</div>
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Để tạo tài khoản, vui lòng điền đầy đủ các thông tin
                        </DialogContentText>

                        <form onSubmit={this.handleSubmit}>
                            <Paper elevation={3}>
                                <div
                                    style={{
                                        textAlign: "center",
                                        color: "red"
                                    }}>
                                    {errors}{" "}
                                </div>
                                <Grid container="container">
                                    <Grid item="item" xs={6} className={classes.grid1}>
                                        <div className={classes.formControl}>
                                            <label className={classes.titleFormControl}>Họ</label>
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                className={classes.contentFormControl}
                                                name="ho"
                                                value={this.state.ho}
                                                type="text"
                                                onChange={this.handleChange}
                                                onKeyUp={this.checkvalid}/>
                                        </div>
                                        <div className={classes.formControl}>
                                            <label className={classes.titleFormControl}>Tên</label>
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                className={classes.contentFormControl}
                                                name="ten"
                                                value={this.state.ten}
                                                type="text"
                                                onChange={this.handleChange}
                                                onKeyUp={this.checkvalid}/>
                                        </div>
                                        <div
                                            className={classes.formControl}
                                            style={{
                                                display: this.props.display
                                            }}>
                                            <label className={classes.titleFormControl}>MSSV</label>
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                className={classes.contentFormControl}
                                                name="ma_sv"
                                                value={this.state.ma_sv}
                                                type="text"
                                                onChange={this.handleChange}
                                                onKeyUp={this.checkvalid}/>
                                        </div>
                                        <div className={classes.formControl}>
                                            <label className={classes.titleFormControl}>Email</label>
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                className={classes.contentFormControl}
                                                name="email"
                                                value={this.state.email}
                                                type="text"
                                                onChange={this.handleChange}
                                                onKeyUp={this.checkvalid}/>
                                        </div>

                                        <div className={classes.formControl}>
                                            <label className={classes.titleFormControl}>
                                                Ngày sinh
                                            </label>

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Fragment>
                                                    <DatePicker
                                                        className={classes.contentNgaysinh}
                                                        onBlur={this.checkvalid}
                                                        format="yyyy/MM/dd"
                                                        name="ngay_sinh"
                                                        value={this.state.ngay_sinh}
                                                        onChange={this.handleDateChange}/>
                                                </Fragment>
                                            </MuiPickersUtilsProvider>
                                        </div>

                                        <div className={classes.gioi_tinh}>
                                            <label className={classes.titleFormControl}>
                                                Giới tính
                                            </label>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="gioi_tinh"
                                                    className={classes.radioSex}
                                                    value={this.state.gioi_tinh}
                                                    onChange={this.handleChange}>
                                                    <FormControlLabel
                                                        value={true}
                                                        control={<Radio checked = {
                                                            this.state.gioi_tinh
                                                        } />}
                                                        label="Nam"/>
                                                    <FormControlLabel
                                                        value={false}
                                                        control={<Radio checked = {
                                                            !this.state.gioi_tinh
                                                        } />}
                                                        label="Nữ"/>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        {/* </Paper> */}
                                    </Grid>

                                    <Grid item="item" xs={6} className={classes.grid2}>
                                        <div className={classes.formControl}>
                                            <label className={classes.titleFormControl}>SĐT</label>
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                className={classes.contentFormControl}
                                                name="sdt"
                                                value={this.state.sdt}
                                                type="number"
                                                onChange={this.handleChange}
                                                onKeyUp={this.checkvalid}/>
                                        </div>
                                        <div className={classes.formControl}>
                                            <label className={classes.titleFormControl}>
                                                Mật khẩu
                                            </label>
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                className={classes.contentFormControl}
                                                name="password"
                                                value={this.state.password}
                                                type="password"
                                                onChange={this.handleChange}
                                                onKeyUp={this.checkvalid}/>
                                        </div>
                                        <div className={classes.formControl}>
                                            <label className={classes.titleFormControl}>
                                                Xác nhận mật khẩu
                                            </label>
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                className={classes.contentFormControl}
                                                name="confirmpassword"
                                                value={this.state.confirmpassword}
                                                type="password"
                                                onChange={this.handleChange}
                                                onKeyUp={this.checkvalid}/>
                                        </div>

                                        <DialogActions>
                                            <div className={classes.btn}>
                                                <Button
                                                    name="btnHuy"
                                                    className={classes.btnHuy}
                                                    onClick={this.handleClose}
                                                    color="primary">
                                                    Hủy bỏ
                                                </Button>
                                                <Button name="btnXNhan" type="submit" color="primary" disabled={status}>
                                                    Xác nhận
                                                </Button>
                                            </div>
                                        </DialogActions>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </form>
                    </DialogContent>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    open={success}>
                    <Alert onClose={this.handleClose} severity="success">
                        {this.state.error1}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    open={error}>
                    <Alert onClose={this.handleClose} severity="error">
                        {this.state.error1}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(DialogThem);
