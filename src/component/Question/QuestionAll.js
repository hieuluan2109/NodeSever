import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";

import MenuItem from "@material-ui/core/MenuItem";
import SearchButton from "../Search";
import axios from "axios";
import Cookies from "js-cookie";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GetQuestionTN from "./QuestionTN";
import GetQuestionTL from "./QuestionTL";
import AddQuestions from "./AddQuestion";
import Pagination from "@material-ui/lab/Pagination";
import Loading from '../Loading'
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
  eyes: {
    marginRight: 20,
    color: "bold",
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
  const title = ["Số thứ tự", "Nội dung", "Chủ đề", "Điểm"];
  const title1 = [
    "Số thứ tự",
    "Nội dung",
    "Chủ đề",
    "Điểm",
    "Ghi chú",
    ".........",
  ];
  const token = Cookies.get("token");
  //   const {TITLE,STT,CAUHOI,DAPANA,DAPANB,DAPANC,DAPAND,DAPANDUNG,DIEM,NGUOITAO,NGAYTAO}=props

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [valueQuestion, setValueQuestion] = useState(true);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleChange = (event) => {
    setValueQuestion((event.target.name = event.target.value));
  };
  const [loading, setLoading] = useState(false);
  const [getListTN, setGetListTN] = useState([]);
  const [getListTL, setGetListTL] = useState([]);
  const [pageTN, setPageTN] = useState(1);
  const [pageTL, setPageTL] = useState(1);
  const [pageNumberTN, setPageNumberTN] = useState(1);
  const [pageNumberTL, setPageNumberTL] = useState(1);
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
        // const {data}=res.data
        setGetListTN(res.data.data);
        setPageTN(res.data.pages);
        console.log("TN", res.data);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageNumberTN]);
  useEffect(() => {
    axios
      .get(url[1], { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        // const {data}=res.data
        setGetListTL(res.data.data);
        setPageTL(res.data.pages);
        console.log("TL", res.data);
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

  return (
    <div className='row'>
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> Danh sách câu hỏi </div>

        <form className={classes.containerForm}>
          <SearchButton onChange={handleSearch} />
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
          <AddQuestions token={token} />
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
