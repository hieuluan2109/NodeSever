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
import CanvasJSReact from '../../canvars/canvasjs.react';
import axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const styles = (theme) => ({
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
});

class DialogInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [
				0,0,0,0,0,0,0,0,0,0,0
      ],
      total_exam: 0,
    };
  }
  componentDidMount(){
    axios.get(
      `https://navilearn.herokuapp.com/admin/stats/diem?id=${this.props.id}`)
      .then((res)=>{
        let totalexam = 0;
        let tamp = res.data.data;
        for ( let i = 0; i < 10;i++)
          totalexam += tamp[i]
        this.setState({
          total_exam: totalexam,
          data : res.data.data
        })
      })
  }
  render() {
    const options = {
			theme: "light1",
			animationEnabled: true,
			exportEnabled: true,
			data: [
			{
				type: "area",
				yValueFormatString: "#,##0.## bài thi",
				dataPoints: [
          { x: 0, y: this.state.data[0]},
					{ x: 1, y: this.state.data[1]},
					{ x: 2, y: this.state.data[2]},
					{ x: 3, y: this.state.data[3]},
					{ x: 4, y: this.state.data[4]},
					{ x: 5, y: this.state.data[5]},
					{ x: 6, y: this.state.data[6]},
					{ x: 7, y: this.state.data[7]},
					{ x: 8, y: this.state.data[8]},
					{ x: 9, y: this.state.data[9]},
					{ x: 10, y: this.state.data[10]},
				]
			}
			]
		}
    return (
      <div>
      <div style={styles.formControl}>
        <label style={styles.titleFormControl}> Số bài thi đã làm: </label>
          {this.state.total_exam || 0}
      </div>
        <div style={{
          maxWidth: '75vh',          
        }}>
        <p style={{marginBottom: '10px'}}>Thống kê điểm Sinh viên</p>
          <CanvasJSChart options = {options} />
        </div>   
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogInfo);
