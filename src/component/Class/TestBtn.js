import { withStyles} from "@material-ui/core/styles";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TestList from './TestList'

const styles = (theme) => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
    minWidth: "100vh",
    maxWidth: "100vh",
  },
  btnTest: {
    marginTop: "30px ",
    float:'left'
  },
});

class TestBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
        };
      }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, data } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          className={classes.btnTest}
        >
          Danh sách bài thi trong lớp
        </Button>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={this.handleClose}

        >
          <DialogTitle>
            Danh sách bài thi
          </DialogTitle>
          <DialogContent >
            <TestList data={data.ds_bai_thi} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TestBtn);
