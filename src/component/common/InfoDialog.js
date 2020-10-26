import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

export default function InfoDialog(props) {
  const [state, setState] = React.useState({
      open:props.isOpen
  });

  function handleClickOpen(){
    setState({open:true});
  };

  const handleClose=()=>{
    setState({open:false});
  };

  console.log(state.open+" and "+props.isOpen+"---- InfoDialog now")
  let clickYesCallback=handleClose;
  let clickNoCallback=handleClose;
  let YesButton="YES"
  let NoButton="NO"
  let InfoTitle="You Are Trying To Trigger A Event"
  let InfoMsg="Are You Sure To Do This?"

  console.log(props, "------InfoDialog")
  if(props.clickYesCallback!=undefined){
    clickYesCallback=props.clickYesCallback
  }
  if (props.clickNoCallback!=undefined){
    clickNoCallback=props.clickNoCallback
  }
  if (props.YesButton!=undefined){
    YesButton=props.YesButton
  }
  if(props.NoButton!=undefined){
    NoButton=props.NoButton
  }
  if(props.InfoTitle!=undefined){
    InfoTitle=props.InfoTitle
  }
  if(props.InfoMsg!=undefined){
    InfoMsg=props.InfoMsg
  }

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{InfoTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {InfoMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickNoCallback} color="primary">
            {NoButton}
          </Button>
          <Button onClick={clickYesCallback} color="primary" autoFocus>
            {YesButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
