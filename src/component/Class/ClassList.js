import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@material-ui/core";
// import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchButton from "../Search";
import axios from "axios";
import Cookies from "js-cookie";
import Pagination from "@material-ui/lab/Pagination";
// import TopicInfor from "./TopicInfor";

const useStyles = makeStyles((theme) => ({
  containerForm: {
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
  table: {
    minWidth: 600,
    maxwidth: 1200,
    width: 1161,
    marginTop: 70,
  },
  eyes: {
    
    color: "bold",
  },
  containerNext: {
    position: "absolute",
    left: "90%",
    top: "87%",
  },
  containerBack: {
    position: "absolute",
    left: "79%",
    top: "87%",
  },
  next: {
    fontSize: "1rem",
  },
  back: {
    fontSize: "1rem",
  },
  buttonPageNumber: {
    display: "inline",
    padding: ".2rem .41rem",
    borderRadius: "30px!important",
    backgroundColor: "#5089de",
    "&": {
      color: "red",
      margin: "0 3px",
      color: "#fff",
      borderColor: "#5089de",
    },
  },

  page: {
    position: "absolute",
    left: "80%",
    top: "85%",
  },
  pagination: {
    marginRight: "70px",
  },
}));

 const ClassTitle = ["Tên Lớp", "Người tạo",'Chi tiết','Danh sách SV trong lớp',"Bài tập"];

export default function ClassList(props) {
  const classes = useStyles();
  const { title } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const token = Cookies.get("token");
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [getClassList, setClassList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/class/list?page=${pageIndex}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
          console.log(res.data)
        setPage(res.data.pages);
        const { data } = res.data;
        setClassList(data);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageIndex]);
  const handleChangePage = (e, value) => {
    setPageIndex(value);
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
      const url = `https://navilearn.herokuapp.com/admin/class/list?search=${params.param}`;
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { data } = res.data;
          setClassList(data);

          setPage(res.data.pages);
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
        });
    }, 300);
  };

  const [dataTopicInfor, setDataTopicInfor] = useState({
    _id: "",
    tieu_de: "",
    mo_ta: "",
    nguoi_tao: "",
    ngay_tao: "",
  });
  const [getSuccess, setSuccess] = useState("");
//   const getTopicInfor = (id) => {
//     axios
//       .get(`https://navilearn.herokuapp.com/admin/category/detail/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const { data } = res.data;
//         console.log(data);
//         setDataTopicInfor({
//           tieu_de: data.tieu_de,
//           mo_ta: data.mo_ta,
//           nguoi_tao: data.nguoi_tao_id.ten,
//           ngay_tao: data.createdAt,
//           _id: data._id,
//         });
//         console.log("GV", dataTopicInfor);
//       })
//       .catch((error) => {
//         console.log("Lỗi", error);
//       });
//   };
//   const handleChangeTopic = (event, status) => {
//     setDataTopicInfor({
//       ...dataTopicInfor,
//       [event.target.name]: event.target.value,
//     });
//     console.log(dataTopicInfor._id);
//   };

//   const onSubmitChangeTopic = (event) => {
//     event.preventDefault();
//     const { _id, tieu_de, mo_ta } = dataTopicInfor;
//     axios
//       .post(
//         `https://navilearn.herokuapp.com/admin/category/update/${_id}`,
//         { tieu_de, mo_ta },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       .then((res) => {
//         setSuccess(res.data.msg);
//         console.log(res.data);
//         // setSuccess(res.data.msg);
//       })
//       .catch((error) => {
//         console.log("Lỗi", error.response);
//       });
//   };
// const clearSuccess=()=>{
//   setSuccess('')
// }
  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> Danh sách lớp học </div>

        <form className={classes.containerForm}>
          <SearchButton onChange={handleSearch} />

          {/* <AddTopic token={token} /> */}

          <div>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow style={{ backgroundColor: "#3f8cb5", height: 50 }}>
                    {ClassTitle.map((valueTitle, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        style={{ color: "#ffffff" }}
                      >
                        {valueTitle}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getClassList.map((value, index) => (
                    <TableRow key={index + 1} hover>
                      <TableCell align="left">{value.tieu_de}</TableCell>
                      {/* <TableCell align="center">{value.mo_ta}</TableCell> */}
                      <TableCell align="center">
                        {value.nguoi_tao_id.ten}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" className={classes.eyes}>
                        <VisibilityIcon />
                          {/* <TopicInfor
                            id={value._id}
                            getInfor={getTopicInfor}
                            data={dataTopicInfor}
                            icon={<VisibilityIcon />}
                            disable={true}
                            status={true}
                          />
                        </IconButton>
                        <IconButton size="small" className={classes.eyes}>
                          <TopicInfor
                            id={value._id}
                            getInfor={getTopicInfor}
                            data={dataTopicInfor}
                            icon={<CreateIcon />}
                            disable={false}
                            type={"submit"}
                            change={handleChangeTopic}
                            onsubmit={onSubmitChangeTopic}
                            display={"none"}
                            status={false}
                            success={getSuccess}
                            clearForm={clearSuccess}
                          /> */}
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" className={classes.eyes}>
                        <VisibilityIcon />
                        </IconButton>
                        </TableCell>
                        <TableCell align="center">
                        <IconButton size="small" className={classes.eyes}>
                        <VisibilityIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </form>

        <Pagination
          className={classes.pagination}
          count={page}
          defaultPage={1}
          color="primary"
          onChange={handleChangePage}
          style={{ float: "right" }}
        />
      </div>
    </div>
  );
}
