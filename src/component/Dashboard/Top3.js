import React, { Component } from 'react';
import CountUp from 'react-countup';
import './style/index.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import FaceIcon from '@material-ui/icons/Face';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));
export default function GeneralStats(props) {
    React.useEffect(()=>{
        axios.get('https://navilearn.herokuapp.com/admin/stats/top-sv')
        .then((res)=>{
            setData(res.data.result);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    const [data, setData] = React.useState('');
    const classes = useStyles();
	return (
      <List component="nav" aria-label="main mailbox folders">
        {data ? 
                <div>
                <ListItem key="0">
                    <ListItemText>
                        {data.info[0] ? '1. '+data.info[0].ho+' '+data.info[0].ten+ ' '+Math.round(data.data[0].avg)+'đ' : '1. (Trống)'}
                    </ListItemText>
                </ListItem>
                <ListItem key="1">
                    <ListItemText>
                        {data.info[1] ? '2. '+data.info[1].ho+' '+data.info[1].ten+ ' '+Math.round(data.data[1].avg)+'đ' : '2. (Trống)'}
                    </ListItemText>
                </ListItem>
                <ListItem key="2">
                    <ListItemText>
                     {data.info[2] ? '3. '+data.info[2].ho+' '+data.info[2].ten+ ' '+Math.round(data.data[2].avg)+'đ' : '3. (Trống)'}
                    </ListItemText>
                </ListItem>
                </div>
         : '...'}
      </List>
	);
}
