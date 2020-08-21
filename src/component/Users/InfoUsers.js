import React, { useEffect, useState, useRef } from "react";
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
import MenuItem from "@material-ui/core/MenuItem";
import SearchButton from "../Search";
import DialogThem from "../DialogThem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import DialogInfor from "../DialogInfo";
import axios from "axios";
import Cookies, { set } from "js-cookie";
import Pagination from "@material-ui/lab/Pagination";
import Sear from "./Search";
import Loading from "../Loading";
import Grid from "@material-ui/core/Grid";
import StatusUser from './Checkedstatus';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const useStyles = makeStyles((theme) => ({
  loading: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
  formInfo: {
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
  formControl: {
    position: "absolute",
    right: "15%",
    minWidth: 120,
  },
  pagination: {
    marginRight: "70px",
  },
  containerForm: {
    marginTop: "50px",
    marginRight: "6%",
    background: "white",
    borderRadius: 10,
  },
}));

export default function InfoUsers(props) {
  const token = Cookies.get("token");
  const classes = useStyles();
  const [age, setAge] = useState(1);
  const [create, setCreate] = useState(true);
  const [display, setDisplay] = useState("none");
  const { title } = props;

  const handleChangeFormCreateAccount = (event) => {
    setCreate(event.target.value);
    create == true ? setDisplay("block") : setDisplay("none");
  };

  const handleChange = (event) => {
    setAge(event.target.value);
    setSort(" ");
    setPageSV(1);
    setPageGV(1);

  };
  const handleClose = () => {
    setDataUser({
      ho: "",
      ten: "",
      ngay_sinh: "",
      sdt: "",
      createdAt: "",
      updatedAt: "",
      trang_thai:true
    });
  };
  const [dataUser, setDataUser] = useState({
    ho: "",
    ten: "",
    ngay_sinh: "",
    sdt: "",
    createdAt: "",
    updatedAt: "",
    trang_thai:true
  });
  const [name, setName] = useState({ fname: "", lname: "" });
  const [getSuccess, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const onclickInfor = (id, age) => {
    if (age == 1) {
      axios
        .get(
          `https://navilearn.herokuapp.com/admin/user/detail/teacher&${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          const { data } = res.data;
          setDataUser(data);
        
          setName({
            fname: res.data.data.nguoi_tao_id.ho,
            lname: res.data.data.nguoi_tao_id.ten,
          });
        })
        .catch((error) => {
          console.log("Lỗi", error);
        });
    }

    if (age == 0) {
      axios
        .get(
          `https://navilearn.herokuapp.com/admin/user/detail/student&${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          const { data } = res.data;
          setDataUser(data);
          setName({
            fname: res.data.data.nguoi_tao_id.ho,
            lname: res.data.data.nguoi_tao_id.ten,
          });
        })
        .catch((error) => {
          console.log("Lỗi", error);
        });
    }
  };
  const setDFres = () => {
    setSuccess("");
  };

  // Chỉnh sửa thông tin user
  const onSubmitInforUser = (event) => {
    event.preventDefault();
    const { _id, ho, ten, ngay_sinh, sdt } = dataUser;
    if (age == true) {
      axios
        .post(
          `https://navilearn.herokuapp.com/admin/user/update?loai=teacher&id=${_id}`,
          { ho, ten, ngay_sinh, sdt },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setSuccess(res.data.msg);
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
        });
    }
    if (age == false) {
      axios
        .post(
          `https://navilearn.herokuapp.com/admin/user/update?loai=student&id=${_id}`,
          { ho, ten, ngay_sinh, sdt },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setSuccess(res.data.msg);
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
        });
    }
  };

  const handleDateChange = (date) => {
    setDataUser({
      ...dataUser,
      ngay_sinh:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    });
  };
  const handleChangeInfoUser = (event, status) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
      status: true,
    });
  };

  const [getListSV, setListSV] = useState([]);
  const [getList, setGetList] = useState([]);
  const [pageGV, setPageGV] = useState(1);
  const [pageSV, setPageSV] = useState(1);
  const [pageNumbberGV, setPageNumberGV] = useState(1);
  const [pageNumbberSV, setPageNumberSV] = useState(1);
  const [sort, setSort] = useState(" ");
  const handleSort = (event) => {
    setSort(event.target.value);
    if (age == 1) {
      setLoading(false);
      axios
        .get(
          `https://navilearn.herokuapp.com/admin/user/list/teacher?page=${pageGV}&sort=${event.target.value}&search=${param}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoading(true);
          const { data } = res.data;
          setGetList(data);
          setPageNumberGV(res.data.pages);
          console.log("ListGV", getList);
        })
        .catch((error) => {
          console.log("Lỗi", error);
        });
    } else {
      setLoading(false);
      axios
        .get(
          `https://navilearn.herokuapp.com/admin/user/list/student?page=${pageSV}&sort=${event.target.value}&search=${param}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoading(true);
          const { data } = res.data;
          setListSV(data);
          setPageNumberSV(res.data.pages);
          console.log("listGV", getListSV);
        })
        .catch((error) => {
          console.log("Lỗi", error);
        });
    }
  };


  useEffect(() => {
    
    setLoading(false);
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/user/list/teacher?page=${pageGV}&sort=${sort}&search=${param}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setLoading(true);
        console.log(res.data);
        const { data } = res.data;
        setGetList(data);
        setPageNumberGV(res.data.pages);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageGV]);

  useEffect(() => {
      setLoading(false);
      axios
        .get(
          `https://navilearn.herokuapp.com/admin/user/list/student?page=${pageSV}&sort=${sort}&search=${param}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoading(true);
          const { data } = res.data;
          setListSV(data);
          setPageNumberSV(res.data.pages);
        
          console.log("SV", res.data);
        })
        .catch((error) => {
          console.log("Lỗi", error);
        });
    },[pageSV]
  );

  const handleChangePage1 = (event, value) => {
    setPageGV(value);
  };
  const handleChangePage2 = (event, value) => {
    setPageSV(value);
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
      const url = age
        ? `https://navilearn.herokuapp.com/admin/user/list/teacher?search=${params.param}&sort=${sort}&page=${pageGV}`
        : `https://navilearn.herokuapp.com/admin/user/list/student?search=${params.param}&sort=${sort}&page=${pageSV}`;
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { data } = res.data;
          age ? setGetList(data) : setListSV(data);
          age
            ? setPageNumberGV(res.data.pages)
            : setPageNumberSV(res.data.pages);
        })
        .catch((error) => {
          console.log("Lỗi", error.response.data);
        });
    }, 300);
  };

  const ChangeStatus = (trangthai, id) => {
    if (age == 1) {
      axios
        .get(
          `https://navilearn.herokuapp.com/admin/user/teacher/status?trang_thai=${trangthai}&id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log("Lỗi", error.response);
        });
    } else {
      axios
        .get(
          `https://navilearn.herokuapp.com/admin/user/student/status?trang_thai=${trangthai}&id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log("Lỗi", error.response);
        });
    }
  };
 
  
  const HandelChangeStatus = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
    // ChangeStatus( event.target.checked,id);
  };
  const[check,setCheck]=useState(true)

  
  const info = [
    "Họ",
    "Tên",
    "Email",
    "Ngày sinh",
    "Chi tiết",
    "Cập nhật",
    "Trạng thái",
  ];
  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> DANH SÁCH NGƯỜI DÙNG </div>
        <div hidden={loading} className={classes.loading}>
          <Loading />
        </div>
        <form>
          <SearchButton onChange={handleSearch} value={param} />
          <FormControl className={classes.formControl}>
            <Grid container spacing={2}>
              <Grid item style={{ position: "relative" }}>
                <InputLabel style={{ top: "20%", left: "10%" }}>
                  Sort
                </InputLabel>
                <Select value={sort} onChange={handleSort}>
                  <MenuItem value=" ">None</MenuItem>
                  <MenuItem value="ho">Họ</MenuItem>
                  <MenuItem value="ten">Tên</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="ngay_sinh">Ngày Sinh</MenuItem>
                </Select>
              </Grid>
              <Grid item style={{ position: "relative" }}>
                <InputLabel style={{ top: "20%", left: "10%" }}>
                  Loại
                </InputLabel>
                <Select value={age} onChange={handleChange}>
                  <MenuItem value={1}>Giáo viên</MenuItem>
                  <MenuItem value={0}>Sinh viên</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </FormControl>

          <DialogThem value={create} token={token} display={display}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Loại</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={create}
                onChange={handleChangeFormCreateAccount}
              >
                <MenuItem value={true}>Giáo viên</MenuItem>
                <MenuItem value={false}>Sinh viên</MenuItem>
              </Select>
            </FormControl>
          </DialogThem>

          <div className={classes.formInfo}>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow style={{ backgroundColor: "#3f8cb5", height: 50 }}>
                    {info.map((row, index) => (
                      <TableCell align="center" style={{ color: "#ffffff" }}>
                        {row}
                      </TableCell>
                    ))}
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody hidden={!loading}>
                  {(age == 1 ? getList : getListSV).map((row, index) => (
                    <TableRow key={index + 1} hover>
                      {/* <TableCell align="center">{index + 1}</TableCell> */}
                      <TableCell align="center">{row.ho}</TableCell>
                      <TableCell align="center">{row.ten}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.ngay_sinh}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" name="icon-eye">
                          <DialogInfor
                            title="Giáo Viên"
                            id={row._id}
                            onClickInfor={onclickInfor}
                            handleClose={handleClose}
                            Data={dataUser}
                            icon={<VisibilityIcon />}
                            age={age}
                            status={true}
                            name={name}
                            setError={setDFres}
                            display={"none"}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" name="icon-eye">
                          <DialogInfor
                            title="Giáo viên"
                            id={row._id}
                            onClickInfor={onclickInfor}
                            Data={dataUser}
                            age={age}
                            icon={<CreateIcon />}
                            status={false}
                            display={"none"}
                            onSubmit={onSubmitInforUser}
                            handleChange={handleChangeInfoUser}
                            handleDateChange={handleDateChange}
                            handleClose={handleClose}
                            type="submit"
                            success={getSuccess}
                            setError={setDFres}
                            name={name}
         
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <StatusUser 
                        // age={age}
                         id={row._id}
                        change={ChangeStatus}
                        trang_thai={row.trang_thai}/>


{/* 
                        <FormControlLabel
                          control={
                            <Switch
                              // setCheck({row.trang_thai})
                              checked={row.trang_thai}
                              // onChange={(event)=>{
                              //   // setCheck({checked:!val});
                              //   ChangeStatus( event.target.checked,row._id);
                              // }}
                              name="switchState"
                            />
                          }
                        /> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* <Pagination count={age==true?pageNumbberGV:pageNumbberSV} defaultPage={1} color="primary" onChange={handleChangePage} /> */}
            </TableContainer>
          </div>
        </form>

        <Pagination
          className={classes.pagination}
          count={pageNumbberGV}
          defaultPage={1}
          color="primary"
          onChange={handleChangePage1}
          style={{ display: age == true ? "block" : "none", float: "right" }}
        />
        <Pagination
          className={classes.pagination}
          count={pageNumbberSV}
          defaultPage={1}
          color="primary"
          onChange={handleChangePage2}
          style={{ display: age == true ? "none" : "block", float: "right" }}
        />
      </div>
      {/* <Sear onsubmit={HandleFilter}/> */}
    </div>
  );
}
