import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import StudentBtn from "./StudentBtn";
import HomeWorkBtn from "./HomeWorkBtn";
import Test from "./TestBtn";


function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {
                value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )
            }
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`};
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));

export default function SimpleTabs(props) {
    console.log(props.data2 ,"SSSSSSSSSSSSFRE")
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Paper elevation={3}>
                <Tabs 
                     indicatorColor="primary"
                    textColor="primary"
                    centered="centered"
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example">
                    <Tab label="Danh sách sinh viên" {...a11yProps(0)}/>
                    <Tab label="Danh sách bài tập" {...a11yProps(1)}/>
                    <Tab label="Danh sách bài thi" {...a11yProps(2)}/>
                </Tabs>
            <TabPanel value={value} index={0}>
                <StudentBtn data={props.data1} />
            </TabPanel>
            <TabPanel value={value} index={1}>
               <HomeWorkBtn data={props.data2}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Test data={props.data3}/>
            </TabPanel>
        </Paper>
    );
}