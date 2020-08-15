import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import StudentBtn from "./StudentBtn";
import HomeWorkBtn from "./HomeWorkBtn";
import Test from "./TestBtn";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = (theme) => ({
  dialogPaper: {
    minHeight: "90vh",
    maxHeight: "90vh",
    minWidth: "160vh",
    // maxWidth: "170vh",
  },
  heightgrd: { height: "90vh", width: "160vh" },
  root: {
    flexGrow: 1,
  },
});

class ClassRoomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errors: "",
      status: true,
      value:0
    };
  }

  handleChange = (event, newValue) => {
    this.setState({value:newValue})
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.dataClassDetail(this.props.id);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, disable, getData } = this.props;
    const { open } = this.state;
    console.log("A", this.props.getData.ds_sinh_vien);

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
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            {getData.tieu_de}
            <Divider />
          </DialogTitle>

          <DialogContent className={classes.formsize}>
            {/* <Grid container>
              <Grid item xs={12} className={classes.heightgrd}> */}

            {/* <Test data={getData}  />
                <HomeWorkBtn data={getData}  />
                <StudentBtn data={getData} /> */}
            {/* </Grid>
            </Grid> */}
            <Grid container>
              <Grid item xs={3}>
                <Paper variant="outlined">
                  Người tạo: {getData.nguoi_tao_id.ho}{" "}
                  {getData.nguoi_tao_id.ten}
                  <br />
                  Lần cập nhật cuối: {getData.updatedAt}
                </Paper>
              </Grid>
              <Grid item xs={9}>
                <Paper square  className={classes.root} elevation={3}>
                  <Tabs
                    value={this.state.value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                    aria-label="disabled tabs example"
                    centered
                  >
                    <Tab label="Danh sách sinh viên" />
                    <Tab label="Danh sách bài tập" />
                    <Tab label="Danh sách bài thi" />
                  </Tabs> 
                      <StudentBtn data={getData.ds_sinh_vien}/>
                </Paper>
                
              </Grid>
              
            </Grid>
            
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ClassRoomDetail);
