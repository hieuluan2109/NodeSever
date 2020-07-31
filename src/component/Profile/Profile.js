import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Cookies from "js-cookie";
import Profile from './MenuProfile'
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    marginTop: "33%",
    marginLeft: "5%",
    background: "#f5f6f8",
  },
  titleformInfo: {
    position: "absolute",
    marginTop: "-35px",
    marginLeft: 60,
    fontSize: 17,
  },

  formInfo: {
    marginTop: "105px",
    marginRight: "6%",
    marginLeft: "6%",
    height: "70vh",
    background: "white",
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
    marginLeft: "150px",
    cursor: "pointer",
  },
  time: {
    marginBottom: "50px",
  },
  textField: {
    marginTop: "-15px",
    width: 150,
  },
}));

export default function Inforprofile(props) {
  const classes = useStyles();

  const [getDataProfile, setDataProfile] = useState({ho:'',ten:'',ngay_sinh:''});
  const [getTen,setGetTen]=useState('')
  const token = Cookies.get("token");
  useEffect(() => {
    axios
      .get("https://navilearn.herokuapp.com/admin/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { data } = res.data;
        setGetTen(data.ten)
        setDataProfile(data); //State để lấy dữ liệu profile admin từ api
      });
  }, []);

  const handleChange = (event) => {
    setDataProfile({
      ...getDataProfile,[event.target.name]: event.target.value,
    })
  };

  const onSubmitInfo = (event) => {
    event.preventDefault();
    const {ho,ten,ngay_sinh}=getDataProfile
    axios
      .post(
        "https://navilearn.herokuapp.com/admin/profile/update",
        { ho, ten, ngay_sinh },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Lỗi", error.response);
      });
  };
  const { title, firstname, lastname, birthday, email } = props;
  console.log(getTen)
  return (
    <div>
  <div className="row">
    <div className="col span-1-of-4">
       <Profile ten={getTen}/>
      </div>
      <div className="col span-3-of-4">
      <div className={classes.titleformInfo}>{title}</div>
      <form onSubmit={onSubmitInfo}>
        <div className={classes.formInfo}>
          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>{firstname}</label>
            <input
              className={classes.contentFormControl}
              name="ho"
              type="text"
              value={getDataProfile.ho}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>{lastname}</label>
            <input
              className={classes.contentFormControl}
              name="ten"
              type="text"
              value={getDataProfile.ten}
              onChange={handleChange}
            />
          </div>

          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>{email}</label>
            <input
              name="email"
              className={classes.contentFormControl}
              type="text"
              value={getDataProfile.email}
              disabled={true}
            />
          </div>
          <div className={classes.formControl}>
            <label className={classes.titleFormControl}>{birthday}</label>

            <TextField
              id="date"
              label="Birthday"
              type="date"
              name="ngay_sinh"
              value={getDataProfile.ngay_sinh}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <input
              className={classes.btnXacnhan}
              type="submit"
              value="Cập Nhật"
            />
          </div>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
}
