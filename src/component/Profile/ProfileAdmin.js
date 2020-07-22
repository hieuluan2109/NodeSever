import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LockIcon from "@material-ui/icons/Lock";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,

    marginTop: "33%",
    marginLeft: "5%",
    background: "#f5f6f8",
  },
  avatar: {
    position: "absolute",
    marginTop: "40px",
    marginLeft: "2%",
    width: 50,
    height: 50,
  },
  info: {
    position: "absolute",
    marginTop: "45px",
    marginLeft: "7%",
  },
  name: {
    position: "absolute",
    marginTop: "65px",
    marginLeft: "7%",
  },
  formInfo: {
    marginTop: "107px",
    marginRight: "6%",
    marginLeft: "6%",
    height: "70vh",
    background: "white",
  },
  titleformInfo: {
    position: "absolute",
    marginTop: "65px",
    marginLeft: 60,
    fontSize: 17,
  },
  formControl: {
    paddingTop: "30px",
    paddingLeft: "30px",
    maxwidth: "600px",
  },
  titleFormControl: {
    width: "150px",
    float: "left",
    marginTop: "10px",
  },
  contentFormControl: {
    width: "450px",
    borderRadius: "5px",
    height: "30px",
    paddingLeft: "20px",
    outline: "none",
    "&:focus": {
      borderColor: "#3f51b5",
    },
  },
  selectDate: {
    margin: theme.spacing(0.5),
    minWidth: 120,
    marginTop: "-10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  btnXacnhan: {
    borderRadius: "5px",
    background: "rgb(253, 216, 53)",
    width: "120px",
    height: "40px",
    marginLeft: "125px",
    cursor: "pointer",
  },
}));
export default function MenuProfile() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [DFstate, setDFState] = React.useState({
    date: "",
    month: "",
    year: "",
  });

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  
  function Repeat(props) {
    const items = [];
    for (let i = props.index; i <= props.num; i++) {
      items.push(i);
    }
    return items.map((x, i) => (
      <option key={i} value={x}>
        {x}
      </option>
    ));
  }
  const [getDataProfile, setDataProfile] = useState([]);
  const [date, setDateTime] = useState([]);
  const token = Cookies.get("token");
  
  useEffect(() => {
    axios
      .get("https://navilearn.herokuapp.com/admin/profile", 
      {headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const { data } = res.data;
        setDataProfile(data); //State để lấy dữ liệu profile admin từ api
        var splitted = data.ngay_sinh.split("-", 3); //Tách chuỗi để lấy ngày tháng năm
        var ngay = splitted[2].split("T", 2);
        const getDay = Number(ngay[0]);
        const getMonth = Number(splitted[1]);
        const getYear = Number(splitted[0]);
        setDateTime({
          date: getDay,
          month: getMonth,
          year: getYear,
        });
      });
  },[]);
  const handleChange = (event) => {
    setDataProfile({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value)
  };

  return (
    <div className="row">
      <div className="col span-1-of-4">
        <Avatar className={classes.avatar} />
        <div className={classes.info}>Tài khoản của</div>
        <div className={classes.name}>Luân mập địt</div>
        <div className={classes.root}>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Thông tin tài khoản" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Thông báo của tôi" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Đổi mật khẩu" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
        </div>
      </div>
      <div className="col span-3-of-4">
        <div className={classes.titleformInfo}> Thông tin tài khoản</div>
        <form>
          <div className={classes.formInfo}>
            <div className={classes.formControl}>
              <label className={classes.titleFormControl}>Họ</label>
              <input
                className={classes.contentFormControl}
                name="ho"
                type="text"
                value={getDataProfile.ho||getDataProfile.ho}
                onChange={handleChange}
              />
            </div>
            <div className={classes.formControl}>
              <label className={classes.titleFormControl}>Tên</label>
              <input
                className={classes.contentFormControl}
                name="ten"
                type="text"
                value={getDataProfile.ten}
                onChange={handleChange}
              />
            </div>
            {/* <div className={classes.formControl}>
              <label className={classes.titleFormControl}>Số điện thoại</label>
              <input
                className={classes.contentFormControl}
                type="text"
                value={state.phoneNumber}
                onChange={handleChange}
              />
            </div> */}
            <div className={classes.formControl}>
              <label className={classes.titleFormControl}>Email</label>
              <input
                name="email"
                className={classes.contentFormControl}
                type="text"
                value={getDataProfile.email}
                disabled={true}
              />
            </div>
            {/* <div className={classes.formControl}>
                    <label
                        className={classes.titleFormControl}
                        style={{ marginTop: "0px" }}
                    >
                        Giới tính
                    </label>
                    <input type="radio" name="gender" defaultChecked />
                    Nam
                    <input type="radio" name="gender" />
                    Nữ
                    </div> */}
            <div className={classes.formControl}>
              <label
                className={classes.titleFormControl}
                style={{ marginTop: "15px" }}
              >
                Ngày sinh
              </label>
              {/* <input className={classes.contentFormControl} type="text" value="Nguyễn Hiếu Luân" /> */}
              <FormControl variant="outlined" className={classes.selectDate}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Ngày
                </InputLabel>
                <Select
                  native
                  name="date"
                  value={date.date||''}
                  onChange={handleChange}
                  label="Ngày"
                  inputProps={{
                    name: "date",
                  }}
                >
                  <option aria-label="None" value="" />
                  <Repeat index={1} num={31} />
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.selectDate}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Tháng
                </InputLabel>
                <Select
                  native
                  value={date.month||""}
                  onChange={handleChange}
                  label="Tháng"
                  inputProps={{
                    name: "thang",
                  }}
                >
                  <option aria-label="None" value="" />
                  <Repeat index={1} num={12} />
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.selectDate}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Năm
                </InputLabel>
                <Select
                  native
                  value={date.year||""}
                  onChange={handleChange}
                  label="Năm"
                  inputProps={{
                    name: "year",
                  }}
                >
                  <option aria-label="None" value="" />
                  {/* <Repeat num={2020}>
                    {(index) => <option value={index}>{index}</option>}
                  </Repeat> */}
                  <Repeat index={1955} num={2020} />
                </Select>
              </FormControl>

              <div className={classes.formControl}>
                <input
                  className={classes.btnXacnhan}
                  type="button"
                  value="Cập Nhật"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
