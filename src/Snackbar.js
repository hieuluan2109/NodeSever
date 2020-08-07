import Alert from '@material-ui/lab/Alert';
import React, {useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';

export default class SnackbarDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            'open': true
        }
    }
    render(){
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
            return;
            }
            this.setState({open: false})
        };
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                autoHideDuration={6000}
                onClose={handleClose}
                open={this.state.open}>
                <Alert onClose={handleClose} severity={this.props.style}>
                    {this.props.message}
                </Alert>
            </Snackbar> 
        )
    }
}