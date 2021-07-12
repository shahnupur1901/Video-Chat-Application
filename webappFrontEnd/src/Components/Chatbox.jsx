/*
Chatbox containing messages
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
import ReactScrollableFeed from 'react-scrollable-feed';
import { ContextProvider, SocketContext } from "/home/nupur/VideoCall/webappFrontEnd/src/ContextProvider"
import ScrollToBottom from 'react-scroll-to-bottom';
import './Chat.css';
function Chatbox() {
  const classes = useStyles();
  const {connectedToHost,messages,senders, sendMessage, message,setMessage,hostname,setHostName, callAnswered, myVideo, peerVideo, callFinished,me,stream, setCallAnswered,answerUser,call,receivingCall } = useContext(SocketContext);
  
  return (
  
   <ReactScrollableFeed >
    {connectedToHost || receivingCall?(
         <h2>Chatbox</h2>
       ):<p></p>}
   {messages.map(function(message, i){//going through all the message objects in the set of messages 
     let senderMe = false;
     if(message.fromID == me){
       senderMe = true;
     }
     return (
    senderMe
      ? (//If the sender is me.
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{message.from}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{message.message}</p>
          </div>
        </div>
        )
        : (//If the sender is the peer.
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundViolet">
              <p className="messageText colorDark">{message.message}</p>
            </div>
            <p className="sentText pl-10 ">{message.from}</p>
          </div>
        )
     )
   }
   )
   }

  </ReactScrollableFeed>
)
}

export default Chatbox;