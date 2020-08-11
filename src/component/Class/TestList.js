import React, { useState } from "react";
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
    backgroundColor: theme.palette.background.paper
  }
}));
export default function VirtualizedList(props) {
  const classes = useStyles();
  const list=props.data
  function renderRow(props) {
    const { index, style } = props;
      return(
        <ListItem button style={style} key={index} >
        <ListItemText primary={list[index].tieu_de}  />
       </ListItem>
      )   
  }
  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired
  };
  return (
    <div className={classes.root}>
      <FixedSizeList height={400} width={250} itemSize={40} itemCount={list.length}>
        {renderRow}    
      </FixedSizeList>
    </div>
  );
}
