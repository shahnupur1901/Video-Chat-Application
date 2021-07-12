//Set stream - your videocam / your screen
import React, { useContext , useState } from 'react';
import { ContextProvider, SocketContext } from "/home/nupur/VideoCall/webappFrontEnd/src/ContextProvider"
import VideocamIcon from '@material-ui/icons/Videocam';
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
export default function Stream() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  async function screensharewithmic(){
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: {
        cursor :'always',
        
      },
      audio :{
        echoCancellation :true,
        noiseSuppression :true
  
      } });
      const audio = await navigator.mediaDevices.getUserMedia({audio : true});
      return new MediaStream([audio.getTracks()[0],stream.getTracks()[0]]);
  }
  async function handleScreenshare(){
    const stream = await screensharewithmic();
    setStream(stream);
    myVideo.current.srcObject = stream;
      handleClose();
  }
  function handleVideocam(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function(stream) {//To start streaming
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
      handleClose();

  }
  const {  setStream,mutevid, MuteVid,UnmuteVid,mute,receivingCall,endMeeting,username,hostname, callAnswered, myVideo, peerVideo, callFinished,me,stream, setCallAnswered,call,Mute,Unmute } = useContext(SocketContext);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Stream</DialogTitle>
        <DialogContent>
          <IconButton color="primary" onClick={handleScreenshare}>
            <ScreenShareIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleVideocam}>
            <VideocamIcon />
          </IconButton>

        </DialogContent>
      </Dialog>
    </div>
  );
}
