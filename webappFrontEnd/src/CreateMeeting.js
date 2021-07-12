/*
Web page for the host to create a meeting.
*/
import React, { useContext , useState } from 'react';
import { ContextProvider, SocketContext } from "/home/nupur/VideoCall/webappFrontEnd/src/ContextProvider"
import { useHistory } from "react-router-dom";
import Stream from './Components/Stream';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import emailjs from 'emailjs-com';
import { useStyles } from './Components/Styles';
import Form from './Components/Form';
import Message from './Components/Message';
import Chatbox from './Components/Chatbox';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import IconButton from "@material-ui/core/IconButton";;

export default function CreateMeeting() {
  const classes = useStyles();
  let history = useHistory();
  const { mutevid, MuteVid,UnmuteVid,mute,receivingCall,endMeeting,username,hostname, callAnswered, myVideo, peerVideo, callFinished,me,stream, setCallAnswered,call,Mute,Unmute } = useContext(SocketContext);
  return (
    <Grid container component="main" className={classes.root}>
      <Stream />
      <CssBaseline />
      <Grid item xs={false} sm={3} md={2} className={classes.image} />
      {stream && (
        <Grid className={classes.paper}>
            <Typography variant="h5" gutterBottom>{hostname}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
            <Chatbox />
           
        </Grid>
       
      
      )}
      {callAnswered && !callFinished?(
        <Grid className={classes.paper}>
          <Typography variant="h5" gutterBottom>{username}</Typography>
          <video playsInline ref={peerVideo} autoPlay className={classes.video} />
          <Button variant="contained" color="primary" onClick={endMeeting} className={classes.end} >
              Leave Meeting
          </Button>
          {//Muting and Unmuting the mic
          mute?
          (
            <IconButton color="primary" onClick={Unmute}>
          <MicOffIcon />
            </IconButton>
          ):
          (
            <IconButton color="primary" onClick={Mute}>
        <MicIcon />
      </IconButton>
          )
        }
        {//Turning the videocamera on/off 
          mutevid?
          (
            <IconButton color="primary" onClick={UnmuteVid}>
          <VideocamOffIcon />
            </IconButton>
          ):
          (
            <IconButton color="primary" onClick={MuteVid}>
        <VideocamIcon />
      </IconButton>
          )
        }
        {callAnswered?(//see the chat window in the meeting
         <Message />
       ):(<Box></Box>)}
        </Grid>
    ):(<Form></Form>)//the form component takes inputs from the user.
    }
    </Grid>
  );
}