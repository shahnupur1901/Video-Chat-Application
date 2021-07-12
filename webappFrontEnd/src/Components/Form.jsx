//To take information the from host and provide services.

import React, { useContext , useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import emailjs from 'emailjs-com';
import { useStyles } from './Styles';
import Alert from './Alert';
import Message from './Message';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ContextProvider, SocketContext } from "/home/nupur/VideoCall/webappFrontEnd/src/ContextProvider"


function Form() {
  const classes = useStyles();
  const { setHostID,hostname,setHostName, callAnswered, myVideo, peerVideo, callFinished,me,stream, setCallAnswered,answerUser,call,receivingCall } = useContext(SocketContext);
  
  
  function handleClick(){//To send an invite via email
    var toEmail = prompt("Enter the recipient's email address.");
    var templateParams = {
      from_name : hostname,
      email : toEmail,
      invite : me,
  };
   
  emailjs.send('service_dlouy7p', 'template_29wmiib', templateParams,'user_yKPaoH5guwPv27qcbJe1f')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
  }
  return (
  <Grid className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create a Meeting
      </Typography>
      <form className={classes.form}>
        <TextField
         variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Enter your name"
          autoFocus
          value = {hostname}
          onChange = {(e) => setHostName(e.target.value)}

        />
       
        <CopyToClipboard text={me}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick = {(e)=> setHostID(me)}
        >
        
        Copy Meet Invite
        </Button>
        </CopyToClipboard>
       
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick = {handleClick}
        >
        Send Meet Invite
        </Button>
        <Alert />
      </form>
      {receivingCall?(//Display the chat window if call is being received.
         <Message />
       ):(<Box></Box>)}
  </Grid>
)
}
export default Form;