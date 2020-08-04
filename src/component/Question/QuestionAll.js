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
import SearchButton from '../Search'
import SelectSort from '../SelectSort'
import DialogThem from '../DialogThem'
import axios from 'axios'
import Cookies from 'js-cookie'
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GetQuestionTN from './QuestionTN'
import GetQuestionTL from './QuestionTL'
import AddQuestions from './AddQuestion'
const useStyles = makeStyles((theme) => ({
  formInfo: {
    marginTop: "50px",
    marginRight: "6%",

    height: "160vh",
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
  formControl: {
    position: "absolute",
    right: "15%",
    minWidth: 120,
  },
}));


export default function QuestionAllList(props) {
  const classes = useStyles();
  const title=["Số thứ tự","Nội dung",'Chủ đề','Điểm'];
  const title1=["Số thứ tự","Nội dung",'Chủ đề','Điểm',"Ghi chú","........."]
  
//   const {TITLE,STT,CAUHOI,DAPANA,DAPANB,DAPANC,DAPAND,DAPANDUNG,DIEM,NGUOITAO,NGAYTAO}=props

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [valueQuestion,setValueQuestion]=useState(true)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleChange = (event) => {
        setValueQuestion(event.target.name=event.target.value)
  };


  const url=['https://navilearn.herokuapp.com/admin/question/list/?loai=choice',
             'https://navilearn.herokuapp.com/admin/question/list/?loai=assay']
          
  const [getListTN,setGetListTN]=useState([])
  const [getListTL,setGetListTL]=useState([])
  const token=Cookies.get('token')
    useEffect(() => {
        axios.get(url[0],{headers:{"Authorization":`Bearer ${token}`}
      }).then(res=>{
        // const {data}=res.data
        setGetListTN(res.data.data)
        console.log("TN",res.data)
      }).catch((error)=>{
        console.log("Lỗi", error)
      })
      axios.get(url[1],{headers:{"Authorization":`Bearer ${token}`}
    }).then(res=>{
      // const {data}=res.data
        setGetListTL(res.data.data);
        console.log("TL",res.data)
    }).catch((error)=>{
      console.log("Lỗi", error)
    })
        
  },[]);
 console.log(valueQuestion)
  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
     
        <div className={classes.titleformInfo}> Danh sách câu hỏi </div>
        
        <form>
        <SearchButton /> 
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Loại</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valueQuestion}
              onChange={handleChange}
            >
              <MenuItem value={true}>Trắc nghiệm</MenuItem>
              <MenuItem value={false}>Tự luận</MenuItem>
            </Select>
          </FormControl>
          <AddQuestions />

          <div className={classes.formInfo}>
            <TableContainer>
            {(valueQuestion==true)?
            <GetQuestionTN getList={getListTN} />
                :
            <GetQuestionTL getList={getListTL} />
            }

            <IconButton size="small" className={classes.containerNext}>
              <ArrowForwardIosIcon className={classes.next} />
            </IconButton>
            <ul className={classes.page}>
              <ListItem
                className={classes.buttonPageNumber}
                button
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                1
              </ListItem>
              <ListItem
                className={classes.buttonPageNumber}
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                2
              </ListItem>
              <ListItem
                className={classes.buttonPageNumber}
                button
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                3
              </ListItem>
              <ListItem
                className={classes.buttonPageNumber}
                button
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                4
              </ListItem>
              <ListItem
                className={classes.buttonPageNumber}
                button
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
              >
                5
              </ListItem>

              {/* <li className={classes.buttonPageNumber}  button
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}>1</li>
                            <li className={classes.buttonPageNumber}  button
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}>2</li>
                            <li className={classes.buttonPageNumber}>3</li>
                            <li className={classes.buttonPageNumber}>4</li>
                            <li className={classes.buttonPageNumber}>5</li> */}
            </ul>
            <IconButton size="small" className={classes.containerBack}>
              <ArrowBackIosIcon className={classes.back} />
            </IconButton>
            </TableContainer>
          </div>
        </form>
      </div>
    </div>

  );
}
