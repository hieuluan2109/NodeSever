import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function VirtualizedList(props) {
  const classes = useStyles();
  const list = props.data;
  function renderRow(props) {
    const { index, style } = props;
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={list[index].ten} />
      </ListItem>
    );
  }

  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };
  //   const token = Cookies.get("token");
  // const [getData,setData]=useState([])
  // const getInfor=(id)=>{
  //   axios
  //   .get(
  //     `https://navilearn.herokuapp.com/admin/user/detail/student&${id}`,
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   )
  //   .then((res) => {
  //     const { data } = res.data;
  //     setData(data);
  //     console.log("GV", res.data);
  //   })
  //   .catch((error) => {
  //     console.log("Lỗi", error);
  //   });
  // }

  return (
    <div className={classes.root}>
      <FixedSizeList
        height={400}
        width={250}
        itemSize={40}
        itemCount={list.length}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
}
