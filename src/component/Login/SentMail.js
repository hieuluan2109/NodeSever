import React from "react";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import {  makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
const useStyles = makeStyles((theme) => ({
 
  confirm: {
    position: "relative",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "600",
  },
  please: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "30px",
  },
  iconContainer: {
    textAlign: "center",
    color: "green",
    fontSize: 44,
  },
  guilai: { color: "blue", cursor: "pointer" },
}));
export default function Sent(props) {
  const classes = useStyles();
 
  return (
    <div>
      <Paper variant="outlined" className="form">
        <div className={classes.iconContainer}>
          {" "}
          <CheckOutlinedIcon style={{ fontSize: 150 }} />
        </div>
        <div className={classes.confirm}>Đã gửi email xác nhận</div>
        <div className={classes.please}>
          Vui lòng kiểm tra email của bạn để được hướng dẫn
        </div>
        <Divider style={{ marginTop: "90px" }} />
        <div style={{ textAlign: "center" }}>
          Không nhận được email?{" "}
          <span onClick={props.resentMail} className={classes.guilai}>
            Gửi lại
          </span>
        </div>
      </Paper>
     
    </div>
  );
}
