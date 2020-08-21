    /* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '../../canvars/canvasjs.react';
import axios from 'axios';
import moment from 'moment'
import TextField from '@material-ui/core/TextField';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class CompareChart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			time: moment().format('YYYY-MM-DD'),
			data: [
				0,0,0,0,0,0,0,0,0,0,0
            ],
            data2: [
				0,0,0,0,0,0,0,0,0,0,0
			]
		}
	}
	componentDidMount(){
		axios.get(
		`https://navilearn.herokuapp.com/admin/stats/dashboard?time=${ moment(this.state.time).subtract(1, 'days') }`)
		.then((res)=>{
			this.setState({
				data2 : res.data.stats
			});
			axios.get(
				`https://navilearn.herokuapp.com/admin/stats/dashboard`)
				.then((res)=>{
					this.setState({
						data : res.data.stats
					})
				})
		})
	}
	handleTime =(event)=>{
		axios.get(
			`https://navilearn.herokuapp.com/admin/stats/dashboard?time=${ moment( event.target.value).subtract(1, 'days') }`)
			.then((res)=>{
				this.setState({
					data2 : res.data.stats
				});
			})
	}
	render() {
		const options = {
			theme: "light1",
			animationEnabled: true,
			exportEnabled: true,
			axisY: {
				lineColor: "#4F81BC",
				tickColor: "#4F81BC",
				includeZero: true
			},
			axisY2: {
				lineColor: "#C0504E",
				tickColor: "#C0504E",
				includeZero: true
			},
			toolTip: {
				shared: true
			},
			data: [{
				type: "column",
				name: "Hiện tại",
				showInLegend: true,      
				yValueFormatString: "#,##0.#",
				dataPoints: [
					{ label: "Sinh viên",  y: this.state.data.sinh_vien },
					{ label: "Giáo viên", y: this.state.data.giao_vien },
					{ label: "Câu hỏi trắc nghiệm", y: this.state.data.cau_hoi_trac_nghiem },
					{ label: "Câu hỏi tự luận",  y: this.state.data.cau_hoi_tu_luan },
					{ label: "Chủ đề",  y: this.state.data.danh_muc },
					{ label: "Lớp",  y: this.state.data.lop_hoc },
					{ label: "Bài thi",  y: this.state.data.bai_thi }
				]
			},
			{
				type: "column",
				name: "Quá khứ",
				showInLegend: true,
				yValueFormatString: "#,##0.#",
				dataPoints: [
					{ label: "Sinh viên",  y: this.state.data2.sinh_vien },
					{ label: "Giáo viên", y: this.state.data2.giao_vien },
					{ label: "Câu hỏi trắc nghiệm", y: this.state.data2.cau_hoi_trac_nghiem },
					{ label: "Câu hỏi tự luận",  y: this.state.data2.cau_hoi_tu_luan },
					{ label: "Chủ đề",  y: this.state.data2.danh_muc },
					{ label: "Lớp",  y: this.state.data2.lop_hoc },
					{ label: "Bài thi",  y: this.state.data2.bai_thi }
				]
			}]
		}
		return (
		<div>
		 <form noValidate>
			<TextField
			onChange= {this.handleTime}
			id="date"
			label="Thời gian so sánh"
			type="date"
			defaultValue={this.state.time}
			InputLabelProps={{
				shrink: true,
			}}
			/>
		</form>
			 <CanvasJSChart options = {options} />
		</div>
		);
	}
}
