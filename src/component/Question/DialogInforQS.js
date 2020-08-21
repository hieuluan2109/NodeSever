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
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
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
    // maxwidth: "400px",
    margin: "20px",
    display: "flex",
  },
  titleFormControl: {
    width: "90px",
    float: "left",
    paddingTop: "20px",
  },
  contentFormControl: {
    width: "350px",
    // borderRadius: "5px",
    // height: "30px",
    // outline: "none",
    // "&:focus": {
    //   borderColor: "#3f51b5",
    // },
  },
  // contentNgaysinh: {
  //   marginTop: "15px",
  //   marginLeft: "10px",
  // },
  gioi_tinh: {
    margin: "20px 10px",
  },
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "90vh",
    minWidth: "170vh",
    // maxWidth: "170vh",
  },
  paper: { marginLeft: "20px" },
  btn: { marginLeft: "75%" },
});

class DialogInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.getDataQuestionInfor(this.props.id);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      dapan,
      noidung,
      diem,
      chude,
      luachona,
      luachonb,
      luachonc,
      luachond,
      nguoitao,
      created,
      updated,
    } = this.props;
    const { open } = this.state;
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
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.title}
            
              <Button
                onClick={this.handleClose}
                name="btnXNhan"
                color="primary"
                className={classes.btn}
                // disabled={status}
              >
                Đóng
              </Button>
            
          </DialogTitle>

          <DialogContent>
            {/* <DialogContentText>
              Để tạo tài khoản, vui lòng điền đầy đủ các thông tin
            </DialogContentText> */}

            <form>
              <Paper elevation={3} style={{marginBottom:'10px'}}>
                <Grid container>
                  <Grid item xs={6} className={classes.grid1}>
                    {/* <Paper  elevation={3} className={classes.paper}> */}
                    <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>
                        Nội dung
                      </label>
                      <TextField
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="noidung"
                        value={noidung}
                        disabled={this.props.status}
                        type="text"
                        multiline={true}
                      />
                    </div>
                    <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>
                        Danh mục
                      </label>
                      <TextField
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="chude"
                        type="text"
                        value={chude}
                        disabled={this.props.status}
                      />
                    </div>
                    <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>
                        Người tạo
                      </label>
                      <TextField
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="ngay_tao"
                        type="text"
                        value={this.props.nguoitao}
                        disabled={this.props.status}
                      />
                    </div>
                    <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>
                        Ngày tạo
                      </label>
                      <TextField
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="ngaytao"
                        type="text"
                        value={created}
                        disabled={this.props.status}
                      />
                    </div>
                    <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>
                      Cập nhật
                      </label>
                      <TextField
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="update"
                        type="text"
                        value={updated}
                        disabled={this.props.status}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={6} className={classes.grid2}>
                    <div
                      className={classes.formControl}
                      style={{ display: this.props.display }}
                    >
                      <label className={classes.titleFormControl}>
                        Đáp án A
                      </label>
                      <TextField
                        multiline={true}
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="dap_an_a"
                        type="text"
                        value={luachona}
                        disabled={this.props.status}
                      />
                    </div>

                    <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>
                        Đáp án B
                      </label>
                      <TextField
                        multiline={true}
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="dap_an_b"
                        type="text"
                        value={luachonb}
                        disabled={this.props.status}
                      />
                    </div>

                    <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>
                        Đáp án C
                      </label>
                      <TextField
                        multiline={true}
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="dap_an_c"
                        type="text"
                        value={luachonc}
                        disabled={this.props.status}
                      />
                    </div>
                    <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>
                        Đáp án D
                      </label>
                      <TextField
                        multiline={true}
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="dap_an_d"
                        type="text"
                        value={luachond}
                        disabled={this.props.status}
                      />
                    </div>
                    <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>Đáp án</label>
                      <TextField
                        multiline={true}
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="dap_an"
                        type="text"
                        value={dapan}
                        disabled={this.props.status}
                      />
                    </div>
                    {/* <div className={classes.formControl}>
                      <label className={classes.titleFormControl}>SĐT</label>
                      <TextField
                        size="small"
                        variant="outlined"
                        className={classes.contentFormControl}
                        name="sdt"
                        value={this.state.sdt}
                        type="number"
                        onChange={this.handleChange}
                        onBlur={this.checkvalid}
                      />
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
                        onBlur={this.checkvalid}
                      />
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
                        onBlur={this.checkvalid}
                      />
                    </div> */}

                    <DialogActions></DialogActions>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogInfo);
