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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchButton from "../Search";
import axios from "axios";
import Cookies from "js-cookie";
import Pagination from "@material-ui/lab/Pagination";
import TestDetail from "./TestDetail";
import Loading from "../Loading";
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
    position: "absolute",
    right: "120px",
    top: "20%",
  },
  table: {
    minWidth: 600,
    maxwidth: 1200,
    width: 1161,
    marginTop: 70,
  },
  pagination: {
    marginRight: "70px",
  },
  loading: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
}));

const topicTitle = [
  "Tên bài thi",
  "Thời gian thi",
  "Ngày thi",
  "Người tạo",
  "",
];

export default function Threadlist(props) {
  const classes = useStyles();
  const token = Cookies.get("token");
  const [getListTest, setListTest] = useState([]);
  const [page, setPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(" ");
  useEffect(() => {
    setLoading(false);
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/test/list?page=${pageIndex}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setLoading(true);
        setPage(res.data.pages);
        const { data } = res.data;
        setListTest(data);
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
      const url = `https://navilearn.herokuapp.com/admin/test/list?search=${params.param}`;
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { data } = res.data;
          setListTest(data);

          setPage(res.data.pages);
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
        });
    }, 300);
  };

  const [dataTest, setDataTest] = useState({
    ds_SV: [],
    dsSV_dathi: [],
    dsCauHoi: [],
    ngay_thi: "",
    thoi_gian_thi: "",
    thoi_gian_tre: "",
    tieu_de: "",
    nguoi_tao: { _id: "", ho: "", ten: "" },
    updatedAt: "",
    diem: "",
    ngay_tao: "",
  });

  const TestListInfor = (id) => {
    axios
      .get(`https://navilearn.herokuapp.com/admin/test/detail/?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { data } = res.data;
        setDataTest({
          ds_SV: data.ds_sinh_vien,
          dsSV_dathi: data.ds_sinh_vien_da_thi,
          dsCauHoi: data.ds_cau_hoi,
          ngay_thi: data.ngay_thi,
          thoi_gian_thi: data.thoi_gian_thi,
          thoi_gian_tre: data.thoi_gian_tre,
          tieu_de: data.tieu_de,
          nguoi_tao: {
            _id: data.nguoi_tao_id._id,
            ho: data.nguoi_tao_id.ho,
            ten: data.nguoi_tao_id.ten,
          },
          ngay_tao: data.createdAt,
          updatedAt: data.updatedAt,
          diem: data.diem,
        });
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  };
  const handleSort = (event) => {
    setSort(event.target.value)
    setLoading(false);
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/test/list?page=${pageIndex}&sort=${event.target.value}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setLoading(true);
        setPage(res.data.pages);
        const { data } = res.data;
        setListTest(data);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  };
  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> DANH SÁCH BÀI THI </div>
        <div hidden={loading} className={classes.loading}>
          <Loading />
        </div>
        <form className={classes.containerForm}>
          <SearchButton onChange={handleSearch} />
          <FormControl className={classes.formControl}>
            <InputLabel>Sort</InputLabel>
            <Select value={sort} onChange={handleSort}>
              <MenuItem value=" ">None</MenuItem>
              <MenuItem value="tieu_de">Tên bài thi</MenuItem>
              <MenuItem value="thoi_gian_thi">Thời gian thi</MenuItem>
              <MenuItem value="ngay_thi">Ngày thi</MenuItem>
              <MenuItem value="nguoi_tao_id">Người tạo</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.formInfo}>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow style={{ backgroundColor: "#3f8cb5", height: 50 }}>
                    {topicTitle.map((valueTitle, index) => (
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
                  {getListTest.map((value, index) => (
                    <TableRow key={index + 1} hover>
                      <TableCell align="center">{value.tieu_de}</TableCell>
                      <TableCell align="center">
                        {value.thoi_gian_thi}
                      </TableCell>
                      <TableCell align="center">{value.ngay_thi}</TableCell>
                      <TableCell align="center">
                        {value.nguoi_tao_id.ten}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
                          <TestDetail
                            icon={<VisibilityIcon />}
                            id={value._id}
                            testList={TestListInfor}
                            data={dataTest}
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
