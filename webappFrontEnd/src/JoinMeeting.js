/*
Web page for the user to join a meeting.
*/
import React, { useState,useContext } from 'react';
import { ContextProvider, SocketContext } from "/home/nupur/VideoCall/webappFrontEnd/src/ContextProvider"
import Stream from './Components/Stream';
import JoinForm from './Components/JoinForm';
import Chatbox from './Components/Chatbox';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
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
import { useStyles } from './Components/Styles';
import Message from './Components/Message';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import IconButton from "@material-ui/core/IconButton";;




export default function JoinMeeting() {
  
  const classes = useStyles();
  const {  mutevid,MuteVid, UnmuteVid,mute, connectedToHost, endMeeting, username,hostname, callAnswered, myVideo, peerVideo, callFinished, stream, call,connectToHost,receivingCall,Mute,Unmute } = useContext(SocketContext)
  
  
  let history = useHistory();
  return (
    <Grid container component="main" className={classes.root}>
    <Stream />
    <CssBaseline />
    <Grid item xs={false} sm={3} md={2} className={classes.image} />
    {stream && (
      <Grid className={classes.paper}>
          <Typography variant="h5" gutterBottom>{username}</Typography>
          <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          <Chatbox />
      </Grid>

    )}
    {callAnswered && !callFinished?(
      <Grid className={classes.paper}>
          <Typography variant="h5" gutterBottom>{hostname || "Host"}</Typography>
          <video playsInline ref={peerVideo} autoPlay className={classes.video} />
          <Button variant="contained" color="primary" onClick={endMeeting} className={classes.end}  >
              Leave Meeting
        </Button>
        {
          mute?//Muting and Unmuting the mic
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
        {
          mutevid?//Turning the videocamera on/off 
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
       {connectedToHost?(//see the chat window in the meeting
         <Message />
       ):(<Box></Box>)}
        </Grid>
       

    ):(<JoinForm></JoinForm>)//the form component takes inputs from the user.
    }
 
  
    </Grid>
  );
}