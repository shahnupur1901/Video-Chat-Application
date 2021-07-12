/*
Chat window to enter and send messages
*/

import React, { useContext , useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import emailjs from 'emailjs-com';
import { useStyles } from './Styles';
import Alert from './Alert';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ContextProvider, SocketContext } from "/home/nupur/VideoCall/webappFrontEnd/src/ContextProvider"
function Message() {
  const classes = useStyles();
  const { sendMessage, text,setText,hostname,setHostName, callAnswered, myVideo, peerVideo, callFinished,me,stream, setCallAnswered,answerUser,call,receivingCall } = useContext(SocketContext);
return (
  <Grid item md = {12} className={classes.paper}>
   
      <Typography component="h4" variant="h6">
        Enter message
      </Typography>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Message"
          autoFocus
          value = {text}
          onChange = {(e)=>{
            setText(e.target.value);
          }}
        multiline
        />
         <Button //To send the message
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick = {(e)=> {
            e.preventDefault();
            sendMessage(text);
            
          }}
        >
        Send
        </Button>
   
      </form>
    
  </Grid>
)
}
export default Message;