import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GetListWork from "./ListWork";
const styles = (theme) => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
    minWidth: "100vh",
    maxWidth: "100vh",
  },
btnhomework: {
    marginTop: "30px",
    float:'right'
  },
});

class ListHomeWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errors: "",
      status: true,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    // this.props.dataClassDetail(this.props.id);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes,data } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          className={classes.btnhomework}
        >
          Danh sách bài tập trong lớp
        </Button>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={this.handleClose}
        >
          <DialogTitle >
            Danh sách bài tập
          </DialogTitle>
          <DialogContent>
            <GetListWork data={data.ds_bai_tap} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ListHomeWork);
