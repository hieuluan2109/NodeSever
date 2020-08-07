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
  GetQuestionList.defaultProps={
    getList:[]
  }
export default function GetQuestionList(props) {
    const {getList}=props;
    const classes = useStyles();
    const title=["Nội dung",'Điểm','Mô tả'];
  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow style={{ backgroundColor: "#3f8cb5", height: 50 }}>
          {title.map((value, index) => (
            <TableCell key={index} align="center" style={{ color: "#ffffff" }}>
              {value}
            </TableCell>
          ))}
          <TableCell align="left" />
       
        </TableRow>
      </TableHead>
      <TableBody>
        {getList.map((row, index) => (
          <TableRow key={index + 1} hover>
            <TableCell align="left" width='700px'>{row.noi_dung}</TableCell>
            <TableCell align="center">{row.diem}</TableCell>
            <TableCell align="left">{row.danh_muc.tieu_de}</TableCell>
            {/* <TableCell align="left">{row.danh_muc.mo_ta}</TableCell> */}
            <TableCell align="center">
              <IconButton size="small" className={classes.eyes}>
                <VisibilityIcon />
              </IconButton>
              <IconButton size="small" className={classes.eyes}>
                <CreateIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
