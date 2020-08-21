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
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchButton from "../Search";
import axios from "axios";
import Cookies from "js-cookie";
import AddTopic from "./AddTopic";
import Pagination from "@material-ui/lab/Pagination";
import TopicInfor from "./TopicInfor";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Loading from "../Loading";
import CheckedStatus from "../Status";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    position: "absolute",
    left: "15%",
    minWidth: 120,
  },
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

  pagination: {
    marginRight: "70px",
  },
  Hello: {
    position: "absolute",
    right: "15%",
    marginTop: "2px",
  },
  loading: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
}));

const topicTitle = [
  "Tên chủ đề",
  "Mô tả",
  "Người tạo",
  "Chi tiết",
  "Cập nhật",
  "Trạng thái",
];

export default function Threadlist(props) {
  const classes = useStyles();
  const { title } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const token = Cookies.get("token");
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [getListTopic, setListTopic] = useState([]);
  const [page, setPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  useEffect(() => {
    setLoading(false);
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/category/list?page=${pageIndex}&sort=${sort}&search=${param}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setLoading(true);
        setPage(res.data.pages);
        const { data } = res.data;
        setListTopic(data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageIndex]);
  const handleChangePage = (e, value) => {
    setPageIndex(value);
  };
  const [sort, setSort] = useState(" ");
  const [param, setParam] = useState("");
  const typingTimeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
      const url = `https://navilearn.herokuapp.com/admin/category/list?search=${params.param}`;
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { data } = res.data;
          setListTopic(data);

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
    trang_thai: true,
  });
  const [getSuccess, setSuccess] = useState("");
  const getTopicInfor = (id) => {
    axios
      .get(`https://navilearn.herokuapp.com/admin/category/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        setDataTopicInfor({
          tieu_de: data.tieu_de,
          mo_ta: data.mo_ta,
          nguoi_tao: data.nguoi_tao_id.ten,
          ngay_tao: data.createdAt,
          update: data.updatedAt,
          _id: data._id,
          trang_thai: data.trang_thai,
        });
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  };
  const handleChangeTopic = (event, status) => {
    setDataTopicInfor({
      ...dataTopicInfor,
      [event.target.name]: event.target.value,
    });
    console.log(dataTopicInfor._id);
  };

  const onSubmitChangeTopic = (event) => {
    event.preventDefault();
    const { _id, tieu_de, mo_ta } = dataTopicInfor;
    axios
      .post(
        `https://navilearn.herokuapp.com/admin/category/update/${_id}`,
        { tieu_de, mo_ta },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setSuccess(res.data.msg);
        console.log(res.data);
        // setSuccess(res.data.msg);
      })
      .catch((error) => {
        console.log("Lỗi", error.response);
      });
  };
  const clearSuccess = () => {
    setSuccess("");
  };
  const handleSort = (event) => {
    setSort(event.target.value);
    setLoading(false);
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/category/list?page=${pageIndex}&sort=${event.target.value}&search=${param}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setLoading(true);
        setPage(res.data.pages);
        const { data } = res.data;
        setListTopic(data);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  };

  const onSubmitChangeStatus = (id, trangthai) => {
    // event.preventDefault();
    // const {_id}=getListTopic
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/category/update/status?id=${id}&trang_thai=${trangthai}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setSuccess(res.data.msg);
        console.log(res.data);
        // setSuccess(res.data.msg);
      })
      .catch((error) => {
        console.log("Lỗi", error.response);
      });
  };

  const [checked, setchecked] = useState([]);

  // {Object.keys(getListTopic).map((item,index)=>{
  //     const list=getListTopic[item]
  //     // setchecked(item.trang_thai)
  //     let trang_thai=checked[item]
  //     if(typeof trang_thai === 'undefined') {
  //       trang_thai = list.trang_thai;
  //   }
  //   console.log(list,'l')
  //   console.log(trang_thai,'tt')
  //   })}
  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> DANH SÁCH CHỦ ĐỀ </div>
        <div hidden={loading} className={classes.loading}>
          <Loading />
        </div>
        <form className={classes.containerForm}>
          <SearchButton onChange={handleSearch} />
          <FormControl className={classes.Hello}>
            <InputLabel style={{ left: "10%" }}>Sort</InputLabel>
            <Select value={sort} onChange={handleSort}>
              <MenuItem value=" ">None</MenuItem>
              <MenuItem value="tieu_de">Tên</MenuItem>
              <MenuItem value="mo_ta">Mô tả</MenuItem>
            </Select>
          </FormControl>
          <AddTopic token={token} />
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
                  {getListTopic.map((value, index) => (
                    <TableRow key={index + 1} hover>
                      <TableCell align="center">{value.tieu_de}</TableCell>
                      <TableCell align="center">{value.mo_ta}</TableCell>
                      <TableCell align="center">
                        {value.nguoi_tao_id.ten}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
                          <TopicInfor
                            id={value._id}
                            getInfor={getTopicInfor}
                            data={dataTopicInfor}
                            icon={<VisibilityIcon />}
                            disable={true}
                            status={true}
                            clearForm={clearSuccess}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
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
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <CheckedStatus 
                         id={value._id}
                        change={onSubmitChangeStatus}
                        trang_thai={value.trang_thai}
                      />
{/*                        
                        <FormControlLabel
                          control={
                            <Switch
                              // onChange={()=>{
                              //   setchecked({[item]:!trang_thai})
                              // }}
                              // onChange={(event) => {
                              //   onSubmitChangeStatus(
                              //     value._id,
                              //     event.target.checked
                              //   );
                              // }}
                              // checked={trang_thai}
                              // value={trang_thai}
                              // name="trang_thai"
                            />
                          }
                        /> */}
              
                        {/* <FormControl className={classes.formControl}>
                         
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value.trang_thai}
                            onChange={(event) => {
                               
                               event.target.value=!value.trang_thai
                              }}
                          >
                            <MenuItem value={true}>Enable</MenuItem>
                            <MenuItem value={false}>Disable</MenuItem>
              
                          </Select>
                        </FormControl> */}
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
