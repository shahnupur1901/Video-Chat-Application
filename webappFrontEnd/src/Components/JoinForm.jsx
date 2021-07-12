//To take information the from user and provide services.
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
import Message from './Message';
import { ContextProvider, SocketContext } from "/home/nupur/VideoCall/webappFrontEnd/src/ContextProvider"
function JoinForm() {
  const classes = useStyles();
  const { connectedToHost, setConnectedToHost, setUserName, username, callAnswered, myVideo, peerVideo, callFinished,me,stream, setCallAnswered,connectToHost,setHostID,hostID,receivingCall,answerUser } = useContext(SocketContext);
  function handleClick(e){
    e.preventDefault();
    connectToHost(hostID);
  }
return (
    <Grid className={classes.paper}>

      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Join a Meeting
      </Typography>
      <form className={classes.form}>
        <TextField //User name
          variant="outlined"
          margin="normal"
          required
          fullWidth
    label="Enter your name"
          autoFocus
          value = {username}
          onChange = {(e) => setUserName(e.target.value)}
        />
        <TextField //Invite (ID) to connect with
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Enter meeting invite"
          autoFocus
          onChange={(e) => setHostID(e.target.value)}
        />
        <Button //Join the meeting
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          value={hostID} 
          onClick={handleClick}
          className={classes.submit}
        >
        Join Meeting
        </Button>
     
      </form>
      {connectedToHost?(//see the chat window before the meeting
         <Message />
       ):(<Box></Box>)}
       
  </Grid>
)
}
export default JoinForm;