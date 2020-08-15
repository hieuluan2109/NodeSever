import axios from 'axios';
import React, {Component} from 'react';
import UserStats from './UserStats';
import GeneralStats from './GeneralStats';
import QuestionStats from './QuestionStats';
import Grid from '@material-ui/core/Grid';
import SimpleTabs from './Tabs';
import './style/index.css';
import Paper from '@material-ui/core/Paper';
import Breadcrumb from './Breadcrumb';
import Loading from './Loading';
import Cookie from 'js-cookie';
export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'data': Array,
            'isLoading': true,
        }
    }
    componentDidMount() {
        axios
            .get("https://navilearn.herokuapp.com/admin/stats/dashboard")
            .then((res) => {
                const {stats} = res.data
                    this.setState({'data': stats, 'isLoading': false})
            });
    };
    render() {
        return (
            <div>
                <div hidden={!this.state.isLoading} className="loading">
                    <Loading />
                </div>
                <div className="wrapper" hidden={this.state.isLoading} >
                    <Grid 
                        container
                        direction="row"
                        justify="center" >
                        <Grid xs={12} sm={5}>
                            <div className="dashboard-title">Dashboard</div>
                        </Grid>
                        <Grid xs={12} sm={5} container direction="row-reverse">
                            <Breadcrumb />
                        </Grid>
                        <Grid xs={12} sm={5}>
                            <Paper className="charts">
                                <div className="charts-title">Thống kê tổng</div>
                                <GeneralStats data={this.state.data}/>
                            </Paper>
                        </Grid>
                        <Grid xs={12} sm={5} >
                            <Paper  className="charts-detail">
                                <div className="charts-title">Biểu đồ</div>
                                <SimpleTabs data={this.state.data}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
