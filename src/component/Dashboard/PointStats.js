/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '../../canvars/canvasjs.react';
import axios from 'axios';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class PointStats extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				1,2,3,4,5,6,7,8,9,10
			]
		}
	}
	componentDidMount(){
		axios.get(
		"https://navilearn.herouapp.com/admin/stats/diem")
		.then((res)=>{
			this.setState({
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
			 <CanvasJSChart options = {options} />
				/* onRef={ref => this.chart = ref} */
		</div>
		);
	}
}
