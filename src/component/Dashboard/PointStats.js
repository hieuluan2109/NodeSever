/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '../../canvars/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class PointStats extends Component {
	render() {
		const options = {
			theme: "light1",
			animationEnabled: true,
			exportEnabled: true,
			data: [
			{
				type: "area",
				yValueFormatString: "#,##0.## Million",
				dataPoints: [
					{ x: 0, y: 0},
					{ x: 1, y: 0},
					{ x: 2, y: 1},
					{ x: 3, y: 0},
					{ x: 4, y: 5},
					{ x: 5, y: 3},
					{ x: 6, y: 24},
					{ x: 7, y: 32},
					{ x: 8, y: 25},
					{ x: 9, y: 16},
					{ x: 10, y: 5},
				]
			}
			]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
		</div>
		);
	}
}
