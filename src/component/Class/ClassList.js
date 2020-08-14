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
import ClassDetail from "./ClassroomDetail";
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

const ClassTitle = ["Tên Lớp", "Người tạo", "Chi tiết"];

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
        console.log(res.data);
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
          console.log(res.data);
          setPage(res.data.pages);
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
        });
    }, 300);
  };

  const [dataClassRoomInfor, setDataClassRoomInfor] = useState({
    ds_bai_tap: [],
    ds_bai_thi: [],
    ds_sinh_vien: [],
    nguoi_tao_id: { _id: "", ho: "", ten: "" },
    tieu_de: "",
    updatedAt: "",
  });
const [dsBaiTap,setDataBaiTap]=useState([])
const [dsBaiThi,setDataBaiThi]=useState([])
  // const [dataClassRoomInfor,setDataClassRoomInfor] = useState([])
  const [getSuccess, setSuccess] = useState("");

  const getClassRoomInfor = (id) => {
    axios
      .get(`https://navilearn.herokuapp.com/admin/class/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        // setDataClassRoomInfor(data)
        setDataClassRoomInfor({
          ds_bai_tap: data.ds_bai_tap,
          ds_bai_thi: data.ds_bai_thi,
          ds_sinh_vien: data.ds_sinh_vien,
          nguoi_tao_id: {
            _id: data.nguoi_tao_id._id,
            ho: data.nguoi_tao_id.ho,
            ten: data.nguoi_tao_id.ten,
          },
          tieu_de: data.tieu_de,
          updatedAt: data.updatedAt,
        });
        console.log("information classroom detail", dataClassRoomInfor);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      })

      axios
      .get(`https://navilearn.herokuapp.com/admin/exercise/belong-class/?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { data } = res.data;
       
        setDataBaiTap({data})
        console.log('BT',dsBaiTap)
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });

      axios
      .get(`https://navilearn.herokuapp.com/admin/test/belong-class?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { data } = res.data;
       
        setDataBaiThi({data})
        console.log('BThi',dsBaiThi)
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  };
  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> Danh sách lớp học </div>

        <form className={classes.containerForm}>
          <SearchButton onChange={handleSearch} />
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
                      <TableCell align="center">
                        {value.nguoi_tao_id.ten}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
                          <ClassDetail
                            icon={<VisibilityIcon />}
                            id={value._id}
                            dataClassDetail={getClassRoomInfor}
                            getData={dataClassRoomInfor}
                            dsBaiTap={dsBaiTap}
                            dsBaiThi={dsBaiThi}
                          />
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
