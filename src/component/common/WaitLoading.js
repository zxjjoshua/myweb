import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles({
    root:{
        width:"100%",
        textAlign:"center",
        color:"darkgrey",
        margin:"15% auto",
    }
  });

export default function WaitLoading(props){
    const classes=useStyles()
    return(
        <div className={classes.root}>
            <CircularProgress />
            <p>{props.msg}</p>
        </div>
        
    )
}
