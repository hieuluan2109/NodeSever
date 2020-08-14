import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import DialogInforQSTN from "../Question/DialogInforQS";
import Cookies from "js-cookie";
import axios from "axios";
const useStyles = makeStyles(() => ({
  table: {
    // marginLeft: 25,
    minWidth: 600,
    maxwidth: 1200,
    width: 1161,
    marginTop: 70,
  },
  eyes: {
    marginRight: 20,
    color: "bold",
  },
}));
GetQuestionList.defaultProps = {
  getList: [],
};
export default function GetQuestionList(props) {
  const { getList } = props;
  const classes = useStyles();
  const token = Cookies.get("token");
  const title = [ "Nội dung", "Danh mục", "Người tạo"];
  const [dataQuestion, setDataQuestion] = useState({
    noidung: "",
    dapan: "",
    diem: "",
    chude: "",
    luachona: "",
    luachonb: "",
    luachonc: "",
    luachond: "",
    nguoitao:'',
    // mota:''
  });
  // useEffect(() => {
  //   getQuestionInforTN()
  // },[dataQuestion])
  const getQuestionInforTN = (id) => {
    axios
      .get(
        `https://navilearn.herokuapp.com/admin/question/detail?loai=choice&q_id=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const { data } = res.data;
      
        console.log(data)
        setDataQuestion({
          noidung: data.noi_dung,
          // dapan: data.dapan,
          diem: data.diem,
          chude: data.danh_muc.tieu_de,
          luachona: data.lua_chon[0].value,
          luachonb: data.lua_chon[1].value,
          luachonc: data.lua_chon[2].value,
          luachond: data.lua_chon[3].value,
          nguoitao: data.nguoi_tao_id.ten,
          // mota:data.danh_muc.mo_ta,
          dapan:data.dap_an.value
        });
      })
      .catch((error) => {
        console.log("Lỗi", error);
      });
  };
  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow style={{ backgroundColor: "#3f8cb5", height: 50 }}>
          {title.map((value, index) => (
            <TableCell key={index} align="center" style={{ color: "#ffffff" }}>
              {value}
            </TableCell>
          ))}
          <TableCell align="center" style={{ color: "#ffffff" }} />
        
        </TableRow>
      </TableHead>
      <TableBody>
        {getList.map((row, index) => (
          <TableRow key={index + 1} hover>
            <TableCell align="left" width='700px'>{row.noi_dung}</TableCell>
            {/* <TableCell align="center" >{row.diem}</TableCell> */}
            <TableCell align="center">{row.danh_muc.tieu_de}</TableCell>
            <TableCell align="center">{row.nguoi_tao_id.ten}</TableCell>
            <TableCell align="left">
              <IconButton size="small" className={classes.eyes}>
                <DialogInforQSTN
                  title="Thông tin câu hỏi"
                  id={row._id}
                  getDataQuestionInfor={getQuestionInforTN}
                  noidung={dataQuestion.noidung}
                  dapan={dataQuestion.dapan}
                  diem={dataQuestion.diem}
                  chude={dataQuestion.chude}
                  luachona={dataQuestion.luachona}
                  luachonb={dataQuestion.luachonb}
                  luachonc={dataQuestion.luachonc}
                  luachond={dataQuestion.luachond}
                  nguoitao={dataQuestion.nguoitao}
                  // mota={dataQuestion.mota}
                  dapan={dataQuestion.dapan}
                  icon={<VisibilityIcon />}
                  //   age={age}
                    status={true}
                  //  name={name}
                />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
