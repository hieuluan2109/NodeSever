import React, { useEffect, useState } from "react";
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
import Cookies from "js-cookie";
import Pagination from "@material-ui/lab/Pagination";
import Sear from './Search'
const useStyles = makeStyles((theme) => ({
  formInfo: {
    marginTop: "50px",
    marginRight: "6%",

    height: "105vh",
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
    marginRight: 20,
    color: "bold",
  },
  formControl: {
    position: "absolute",
    right: "15%",
    minWidth: 120,
  },
  pagination:{
    marginRight:'70px'
  }
}));

export default function InfoUsers(props) {
  const token = Cookies.get("token");
  const classes = useStyles();
  const [age, setAge] = useState(1);
  const [create, setCreate] = useState(true);
  const [display, setDisplay] = useState("none");

  const [pageGV, setPageGV] = useState(1);
  const [pageSV, setPageSV] = useState(1);

  const { title, stt, firstname, lastname, email, DoB } = props;

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleChangeFormCreateAccount = (event) => {
    setCreate(event.target.value);
    create == true ? setDisplay("block") : setDisplay("none");
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [dataUser, setDataUser] = useState({ ho: "", ten: "", ngay_sinh: "" });
  const [name, setName] = useState("");
  const [getSuccess, setSuccess] = useState(false);
  const onclickInfor = (id, age) => {
    if (age === 1) {
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
          setName(res.data.data.nguoi_tao_id.ten);
          console.log("GV", res.data);
          //  console.log(data[0].ho)
        })
        .catch((error) => {
          console.log("Lỗi", error);
        });
    }

    if (age === 0) {
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
          console.log("SV", res.data);
        })
        .catch((error) => {
          console.log("Lỗi", error);
        });
    }
  };
  const setDFres = () => {
    setSuccess("");
  };

  // const HandleFilter=(newFilter)=>{
  //   console.log('AAAAAAAA',newFilter)
  // }

  // Chỉnh sửa thông tin user
  const onSubmitInforUser = (event) => {
    event.preventDefault();
    const { _id, ho, ten, email, ngay_sinh } = dataUser;

    console.log(age);
    if (age == true) {
      axios
        .post(
          `https://navilearn.herokuapp.com/admin/user/update?loai=teacher&id=${_id}`,
          { ho, ten, ngay_sinh },
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

  const handleChangeInfoUser = (event, status) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  // console.log("Get",dataUser)
  const [getListSV, setListSV] = useState([]);
  const [getList, setGetList] = useState([]);

  const [pageNumbberGV, setPageNumberGV] = useState(1);
  const [pageNumbberSV, setPageNumberSV] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/user/list/teacher?page=${pageGV}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
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
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/user/list/student?page=${pageSV}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const { data } = res.data;
        setListSV(data);
        setPageNumberSV(res.data.pages);
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  }, [pageSV]);

  const handleChangePage1 = (event, value) => {
    setPageGV(value);
  };
  const handleChangePage2 = (event, value) => {
    setPageSV(value);
  };

  const [param, setParam] = useState("");

  const handleSearch = (e) => {
    setParam(e.target.value);
    console.log(param);
  };
  const SearchUser = (event) => {
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/user/list/teacher?search=${param}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const { data } = res.data;
        setGetList(data);
        setPageNumberGV(res.data.pages);
      })
      .catch((error) => {
        console.log("Lỗi", error.response.data);
      });
  };

  return (
    <div className="row">
      <div className="col span-1-of-12"></div>
      <div className="col span-11-of-12">
        <div className={classes.titleformInfo}> {title} </div>

        <form>
      
          <SearchButton onChange={handleSearch} onSubmit={SearchUser} />

          <FormControl className={classes.formControl}>
            <InputLabel>Loại</InputLabel>
            <Select value={age} onChange={handleChange}>
              <MenuItem value={1}>Giáo viên</MenuItem>
              <MenuItem value={0}>Sinh viên</MenuItem>
            </Select>
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
                    {/* <TableCell align="center" style={{ color: "#ffffff" }}>
                      {stt}
                    </TableCell> */}
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {firstname}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {lastname}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {email}
                    </TableCell>
                    <TableCell align="center" style={{ color: "#ffffff" }}>
                      {DoB}
                    </TableCell>

                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(age == 1 ? getList : getListSV).map((row, index) => (
                    <TableRow key={index + 1} hover>
                      {/* <TableCell align="center">{index + 1}</TableCell> */}
                      <TableCell align="center">{row.ho}</TableCell>
                      <TableCell align="center">{row.ten}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.ngay_sinh}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" className={classes.eyes}>
                          <DialogInfor
                            title="Giáo Viên"
                            id={row._id}
                            onClickInfor={onclickInfor}
                            Data={dataUser}
                            icon={<VisibilityIcon />}
                            age={age}
                            status={true}
                            name={name}
                            setError={setDFres}
                          />
                        </IconButton>

                        <IconButton size="small" className={classes.eyes}>
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
                            type="submit"
                            success={getSuccess}
                            setError={setDFres}
                            // submitForm={onSubmitInforUser}
                          />
                        </IconButton>
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
