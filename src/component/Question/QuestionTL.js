import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import DialogInforTN from './DialogInfoQSTL'
import axios from "axios";
  import Cookies from "js-cookie";
const useStyles = makeStyles(() => ({
  table: {
    // marginLeft: 25,
    minWidth: 600,
    maxwidth: 1200,
    width: 1161,
    marginTop: 70,
  },

  }));
  GetQuestionList.defaultProps={
    getList:[]
  }
export default function GetQuestionList(props) {
    const {getList}=props;
    const [dataQuestion, setDataQuestion] = React.useState({
      noi_dung: "",
      danh_muc: "",
      mo_ta: "",
      ho: "",
      ten: "",
      updated: "",
    });
    const classes = useStyles();
    const title=["Nội dung",'Danh mục','Người tạo','Chi tiết'];
    const token = Cookies.get("token");
    const getQuestionInforTL = (id) => {
      axios
        .get(
          `https://navilearn.herokuapp.com/admin/question/detail?loai=assay&q_id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          const { data } = res.data;
          setDataQuestion({
            noi_dung: data.noi_dung,
            danh_muc: data.danh_muc.tieu_de,
            mo_ta:data.danh_muc.mo_ta,
            ho:data.nguoi_tao_id.ho,
            ten: data.nguoi_tao_id.ten,
            updated: data.updatedAt,
          })
          console.log(data)
        
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
        
       
        </TableRow>
      </TableHead>
      <TableBody>
        {getList.map((row, index) => (
          <TableRow key={index + 1} hover>
            <TableCell align="left" width='700px'>{row.noi_dung}</TableCell>
            {/* <TableCell align="center">{row.diem}</TableCell> */}
            <TableCell align="center">{row.danh_muc.tieu_de}</TableCell>
            <TableCell align="center">{row.nguoi_tao_id.ten}</TableCell>
            {/* <TableCell align="left">{row.danh_muc.mo_ta}</TableCell> */}
            <TableCell align="center">
              <IconButton size="small">
              <DialogInforTN
               title="Thông tin câu hỏi"
                icon={  <VisibilityIcon />}
                id={row._id}
                noi_dung={dataQuestion.noi_dung}
                danh_muc={dataQuestion.danh_muc}
                mo_ta={dataQuestion.mo_ta}
                update={dataQuestion.updated}
                ho_nguoi_tao={dataQuestion.ho}
                ten_nguoi_tao={dataQuestion.ten}
                getDataQuestion={getQuestionInforTL}
              />
              
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
