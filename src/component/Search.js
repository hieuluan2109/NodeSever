import { fade,withStyles,useTheme } from "@material-ui/core/styles";
import React, { Component } from 'react'
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import LayersIcon from "@material-ui/icons/Layers";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import {Link} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    
    search: {
        position: 'absolute',
        borderBottom: '3px solid  #ce93d8',
        borderRight: '2px solid  #ce93d8',
        borderRadius:'25px',
        backgroundColor: '#f3e5f5',
        left:'30%',
        '&:hover': {
          borderColor: '#5089de',
        },
        marginRight: theme.spacing(2),
        marginTop:'10px',
        width: '35%',
        height:'40px'
        
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        // top:'10px',
         right:'10px',
        pointerEvents: 'none',
        display: 'inline',
        alignItems: 'center',
        justifyContent: 'center',
        color:'black',
        fontWeight:'bold',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: '20px',
        paddingTop:'10px',
        color:'black',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '40ch',
        },
      },
    
     
} );

class SearchButton extends Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
      };
    }
   

  render() {
    const { classes } = this.props;
 
    return (
      
        <div className={classes.search}>
        <InputBase
          placeholder="Tìm kiếm"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        {/* <div className={classes.searchIcon}>
            <SearchIcon />
        </div> */}
        <IconButton className={classes.searchIcon} size="small">
            <SearchIcon />
      </IconButton>
      
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SearchButton);