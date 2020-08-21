import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TableContainer,MenuItem,InputLabel,Select,FormControl,Grid} from '@material-ui/core'
import SearchButton from "../Search";
import axios from "axios";
import Cookies from "js-cookie";
import GetQuestionTN from "./QuestionTN";
import GetQuestionTL from "./QuestionTL";
import AddQuestions from "./AddQuestion";
import Pagination from "@material-ui/lab/Pagination";
import Loading from '../Loading'
import AddQuestionsTL from './AddQuestionTL'
const useStyles = makeStyles((theme) => ({
  loading: {
    position: "fixed",
    top: "50%",
    left: "50%"
  },
  containerForm:{
    marginTop: "50px",
    marginRight: "6%",
    background: "white",
    borderRadius: 10,
  },
  titleformInfo: {
    position: "absolute",
    marginTop: "70px",
    marginLeft: 30,
    fontSize: 20,
    paddingBottom: 30,
    fontWeight: 600,
  },
  formControl: {
    paddingTop: "30px",
    paddingLeft: "30px",
    maxwidth: "600px",
  },
  formControl: {
    position: "absolute",
    right: "15%",
    minWidth: 120,
  },
  pagination: {
    marginRight: "70px",
  },
 
}));

export default function QuestionAllList(props) {
  const classes = useStyles();
  const token = Cookies.get("token");
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [valueQuestion, setValueQuestion] = useState(true);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleChange = (event) => {
    setValueQuestion((event.target.name = event.target.value));
    setSort(' ');
  };
  const [loading, setLoading] = useState(false);
  const [getListTN, setGetListTN] = useState([]);
  const [getListTL, setGetListTL] = useState([]);
  const [pageTN, setPageTN] = useState(1);
  const [pageTL, setPageTL] = useState(1);
  const [pageNumberTN, setPageNumberTN] = useState(1);
  const [pageNumberTL, setPageNumberTL] = useState(1);
  const [sort, setSort] = useState(' ');
  const url = [
    `https://navilearn.herokuapp.com/admin/question/list/?loai=choice&page=${pageNumberTN}`,
    `https://navilearn.herokuapp.com/admin/question/list/?loai=assay&page=${pageNumberTL}`,
  ];
  // const token=Cookies.get('token')
  useEffect(() => {
    setLoading(false)
    axios
      .get(url[0], { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setLoading(true)
        setGetListTN(res.data.data);
        setPageTN(res.data.pages);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageNumberTN]);
  useEffect(() => {
    setLoading(false)
    axios
      .get(url[1], { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setLoading(true)
        setGetListTL(res.data.data);
        setPageTL(res.data.pages);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageNumberTL]);

  const handleChangePage1 = (event, value) => {
    setPageNumberTN(value);
  };
  const handleChangePage2 = (event, value) => {
    setPageNumberTL(value);
  };

  const [param, setParam] = useState("");
  const typingTimeoutRef = useRef(null);
  const handleSearch = (e) => {
    const value = e.target.value;
    setParam(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const params = {
        param: value,
      };
      const url =
        valueQuestion == true
          ? `https://navilearn.herokuapp.com/admin/question/list/?loai=choice&search=${params.param}`
          : `https://navilearn.herokuapp.com/admin/question/list/?loai=assay&search=${params.param}`;
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { data } = res.data;
          valueQuestion == true ? setGetListTN(data) : setGetListTL(data);
          valueQuestion==true?setPageTN(res.data.pages):setPageTL(res.data.pages)
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
        });
    }, 300);
  };
  const handleSort=(event)=>{
    setSort(event.target.value)
    if ( valueQuestion ){
      setLoading(false)
      axios
        .get(`https://navilearn.herokuapp.com/admin/question/list/?loai=choice&page=${pageNumberTN}&sort=${event.target.value}`, 
          { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setLoading(true)
          setGetListTN(res.data.data);
          setPageTN(res.data.pages);
        })
        .catch((error) => {
          console.log("Lỗi", error);
        });
      } else {
        setLoading(false)
    axios
      .get(`https://navilearn.herokuapp.com/admin/question/list/?loai=assay&page=${pageNumberTL}&sort=${event.target.value}`
        , { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setLoading(true)
        setGetListTL(res.data.data);
        setPageTL(res.data.pages);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
      }
  }
  return (
    <div className='row'>
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> DANH SÁCH CÂU HỎI </div>
        <form className={classes.containerForm}>
          <SearchButton onChange={handleSearch} />
          <FormControl className={classes.formControl}>
          <Grid container spacing={2}>
            <Grid item style={{position: 'relative'}} >
              <InputLabel style={{top:'20%', left: '10%'}}>Sort</InputLabel>
              <Select value={sort} onChange={handleSort}>
                <MenuItem value=' '>None</MenuItem>
                <MenuItem value='noi_dung'>Nội dung</MenuItem>
                <MenuItem value='danh_muc'>Danh mục</MenuItem>
              </Select>
            </Grid>
            <Grid item style={{position: 'relative'}}>
            <InputLabel id="demo-simple-select-label" style={{top:'20%', left: '10%'}}>Loại</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valueQuestion}
              onChange={handleChange}
            >
              <MenuItem value={true}>Trắc nghiệm</MenuItem>
              <MenuItem value={false}>Tự luận</MenuItem>
            </Select>
            </Grid>
          </Grid>
          </FormControl>
          {/* {valueQuestion?<AddQuestions token={token} valueQuestion={true}/>:<AddQuestionsTL token={token} valueQuestion={false}/>} */}
     
          <div hidden={loading} className={classes.loading}><Loading /></div>
          <div className={classes.formInfo}>
            <TableContainer>
              {valueQuestion == true ? (
                <GetQuestionTN getList={getListTN} />
              ) : (
                <GetQuestionTL getList={getListTL} />
              )}
            </TableContainer>
          </div>
        </form>
        <Pagination
          className={classes.pagination}
          count={pageTN}
          defaultPage={1}
          color="primary"
          onChange={handleChangePage1}
          style={{
            display: valueQuestion == true ? "block" : "none",
            float: "right",
          }}
        />
        <Pagination
          className={classes.pagination}
          count={pageTL}
          defaultPage={1}
          color="primary"
          onChange={handleChangePage2}
          style={{
            display: valueQuestion == true ? "none" : "block",
            float: "right",
          }}
        />
      </div>
    </div>
  );
}
