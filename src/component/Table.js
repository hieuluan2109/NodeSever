import React,{useEffect,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from '@material-ui/core/MenuItem';
import SearchButton from '../component/Search'
import SelectSort from '../component/SelectSort'
import axios from 'axios'
import Cookies from 'js-cookie'
const useStyles = makeStyles((theme) => ({
  formInfo: {
    marginTop: "50px",
    marginRight: "6%",

    height: "100vh",
    background: "white",
    borderRadius: 10,
  },
  titleformInfo: {
    position: "absolute",
    marginTop: "70px",
    marginLeft: 30,
    fontSize: 20,
    paddingBottom: 30,
    fontWeight:600
  },
  formControl: {
    paddingTop: "30px",
    paddingLeft: "30px",
    maxwidth: "600px",
  },
  table: {
    // marginLeft: 25,
    minWidth: 600,
    maxwidth: 1200,
    width: 1161,
    marginTop: 70,
  },
  eyes: {
    marginRight: 20,
    color: "bold",
  },
  // tableRow:{
  //     '&:nth-of-type(odd)': {
  //         backgroundColor: theme.palette.action.focus,
  //       },
  // }
  containerNext: {
    position: "absolute",
    left: "90%",
    top: "86.5%",
  },
  containerBack: {
    position: "absolute",
    left: "79%",
    top: "86.5%",
  },
  next: {
    fontSize: "1rem",
  },
  back: {
    fontSize: "1rem",
  },
  buttonPageNumber: {
      position:'relative',
    display: "inline",
    padding: ".2rem .41rem",
    borderRadius: "30px!important",
    backgroundColor: "#5089de",
    // background:'red',
    "&": {
      color: "red",
      margin: "0 3px",
      color: "#fff",
      borderColor: "#5089de",
    },
   
    // '&:focus':{
    //     backgroundColor:'red'
    // }
    // },'&:hover':{
    //     backgroundColor:'green'
    // }
  },

  page: {
    position: "absolute",
    left: "80%",
    top: "85%",
  },
}));


export default function Table1(props) {
  const classes = useStyles();
  const [title,setTitle]=useState(
      {
        stt:'Số TT',
       ho:'Họ',
       ten:'Tên',
       email:'Email',
       ngaysinh:'Ngày sinh'
      })
  const [selectedIndex, setSelectedIndex] = React.useState(1);
 
  
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [getList,setGetList]=useState([])
  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
     
        <div className={classes.titleformInfo}> Tài khoản người dùng </div>
        
        <form>

          <div className={classes.formInfo}>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
             
                <TableHead>
                  <TableRow style={{ backgroundColor: "#3f8cb5", height: 50 }}>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {title.stt}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                       {title.ho}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {title.ten}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {title.email}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {title.ngaysinh}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getList.map((row, index) => (
                    <TableRow key={index + 1} hover>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">{row.createdAt}</TableCell>
                    
                      <TableCell align="center">
                        <IconButton size="small" className={classes.eyes}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton size="small" className={classes.eyes}>
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
         

            </TableContainer>
          </div>
        </form>
      </div>
    </div>

  );
}
