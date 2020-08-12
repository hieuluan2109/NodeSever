import React, { Component } from 'react';
import CanvasJSReact from '../../canvars/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class QuestionStats extends Component {
    constructor(props) {
        super(props);
    }
    render() {
		const {data, total} = this.props;
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			// title:{
			// 	text: "Thống kê câu hỏi",
			// 	fontSize: 17,
			// 	fontFamily: 'Roboto',
			// 	fontWeight: 'Bold'
			// },
			data: [{
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				type: "pie",
				exportEnabled: false,
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: [
					{ y: Math.round(( data.cau_hoi_trac_nghiem / total ) * 100), label: "Trắc nghiệm" },
					{ y: Math.round(( data.cau_hoi_tu_luan / total ) * 100) , label: "Tự luận" },
				]
			}]
		}
		return (
			<div>
				<CanvasJSChart options = {options} />
			</div>
		);
	}
}
