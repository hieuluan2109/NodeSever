import { fade,withStyles,useTheme } from "@material-ui/core/styles";
import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import View from '../view/Profile'
import View1 from '../view/Question'
const styles = theme => ({
      formControl: {
        position:'absolute',
        right:"15%",
        minWidth: 120,
      },  
} );

class SelectSort extends Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
            role:this.props.GV,
      };
    }
        handleChange = (event) => {
        this.setState({role:event.target.value});
      };
      handleClose = () => {
      this.setState({open:false})
      };
      handleOpen = () => {
        this.setState({open:true})
      };
     
  render() {
   
    const { classes,title,GV,SV,children } = this.props;
    const {open,role}=this.state
    return (
        <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel>
          <Select
            open={open}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            value={role}
            onChange={this.handleChange}
          >
            <MenuItem value={GV}>{GV}</MenuItem>
            <MenuItem value={SV}>{SV}</MenuItem>
            {children}
          </Select>
        </FormControl>
      
      </div>
      
    );
  }
}

export default withStyles(styles, { withTheme: true })(SelectSort);