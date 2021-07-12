/*
To display the Answer button whenever the the user has clicked 'Join Meeting', i.e host is receiving a call.
*/

import React, { useContext , useState } from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './Styles';
import { ContextProvider, SocketContext } from "/home/nupur/VideoCall/webappFrontEnd/src/ContextProvider";
function Alert() {
    const classes = useStyles();
    function handleClick(e){
        e.preventDefault();
        answerUser();
    }
    const { name, callAnswered,answerUser, myVideo, peerVideo, callFinished,me,stream, setCallAnswered,connectToHost,setHostID,hostID,receivingCall } = useContext(SocketContext);
    return (
        <>
        {receivingCall && !callAnswered ? (
            <Button variant="contained" color="primary" onClick={handleClick} fullWidth className={classes.submit}>
                Answer
            </Button>
    ) : null}
    </>
    );
}
  export default Alert;