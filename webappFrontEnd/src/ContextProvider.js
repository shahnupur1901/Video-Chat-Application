/*
Server interactions and major functions are included.
*/
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useHistory } from "react-router-dom";
import Peer from 'simple-peer';

//Setting the socket
const SocketContext = createContext();
const socket = io('https://video-and-chat-app.herokuapp.com/');//creating socket instance on the client side. 


const ContextProvider = ({ children }) => {
//States required for proper functioning with react hook useState :
const [callAnswered, setCallAnswered] = useState(false);
const [callFinished, setCallFinished] = useState(false);
const [stream, setStream] = useState();
const [hostname, setHostName] = useState('');
const [username, setUserName] = useState('');
const [userSignal, setUserSignal ] = useState();
const [user,setUser] = useState("");
const [me, setMe] = useState('');
const [receivingCall, setReceivingCall] = useState(false);
const [hostID,setHostID] = useState("");
const [text, setText] = useState("");
const [connectedToHost, setConnectedToHost] = useState(false);
const [messages,setMessages] = useState([]);
const [senders,setSenders] = useState([]);
const [mute,setMute] = useState(false);
const [mutevid,setMuteVid] = useState(false);
//States required for proper functioning with react hook useRef which returns a mutable object that can be accessed with the current keyword.
  const myVideo = useRef();
  const peerVideo = useRef();
  const connectionRef = useRef();

//The useEffect hook performs the actions after every render.
  useEffect(() => {
    //Stream is available from the Stream function called from create meeting and join meeting.
    socket.on('me', (id) => setMe(id));//set ID
    socket.on('connectToHost', (data) => {//perform after 'connectToHost' is emitted by server.
			setUserName(data.name)
			setUserSignal(data.signal)
      setReceivingCall(true)
			setUser(data.from)
    });
  
    socket.on('message', (from,fromID,message) => {//The message is appended to the set of messages after 'message' is emitted by the server, i.e received by this client.
      //A message is an object here with fields : message, fromID, from.
      setMessages(messages => [ ...messages, {message:message,fromID:fromID,from:from} ]);
    });
  
  }, []);
  function sendMessage(text) {
    //Thee message is appended to the set of messages after 'message' is emitted by this client i.e sent by this client.
    setMessages(messages => [ ...messages,  {message:text,fromID:me,from:hostID==me ?  hostname: username} ]);
    socket.emit('sendMessage',{
      to : (hostID==me ? user : hostID),
      from : (hostID==me ?  hostname: username),
      fromID : me,
      message : text,
      
    })
  }
  function MuteVid(){//Turn videocamera off
    setMuteVid(true);
    stream.getVideoTracks()[0].enabled = false;
  }
  function UnmuteVid(){//Turn videocamera on
    setMuteVid(false);
    stream.getVideoTracks()[0].enabled = true;
  }
  function Mute(){//Mute the microphone
    setMute(true);
    stream.getAudioTracks()[0].enabled = false;
  }
  function Unmute(){//Unmute the microphone
    setMute(false);
    stream.getAudioTracks()[0].enabled = true;
  }
  function answerUser(){//information emitted from host to server, executed whenever answer button is clicked.
    setCallAnswered(true);
    setHostID(me);
    //The host will answer the request made by the user, thus he/she is not the initiator.
    const hostpeer = new Peer({ initiator: false, trickle: false, stream:stream });
    hostpeer.on('signal', function(data) {//sending signalling data to the remote peer.
      socket.emit('answerUser', { signal: data, to: user, name : hostname,from:me });
    });
    //To start streaming of the other peer whenever a remote video stream is received.
    hostpeer.on('stream', (stream) => {
      peerVideo.current.srcObject = stream;
    });
    //Maintaining direct connection between peers
    hostpeer.signal(userSignal);
    connectionRef.current = hostpeer;
  };

  function connectToHost(id) {//information emitted from user to server, executed whenever Join Meeting button is clicked.
    //The user is the initiator as he/she requests the host to answer the call.
    const userpeer = new Peer({ initiator: true, trickle: false, stream :stream});
    setHostID(id);
    setUser(me);
    userpeer.on('signal', function(data){// to send signalling data to the server. 
      socket.emit('connectToHost', { 
        host: id,
        signalData: data,
        from: me, 
        name: username});
    });
     //To start streaming of the other peer whenever a remote video stream is received.
      userpeer.on('stream', (stream) => {
      peerVideo.current.srcObject = stream;
  });
    //Executed after the answer button is clicked by the host, and the server passes the signalling data to the user. 
    socket.on('callAnswered', (signal,name) => {
      setCallAnswered(true);
      setHostName(name);
      userpeer.signal(signal);//direct connection between peers is maintained
      
    });
    connectionRef.current = userpeer;
    setConnectedToHost(true);

  };
  //End meeting but keep the
  function endMeeting() {
    var myName = hostID==me ?  hostname: username;
    var str = "Message for all users : " +myName +" has left the video call. You may continue to chat!";
    sendMessage(str);
    setCallFinished(true);
    connectionRef.current.destroy();
  };

  return (
    <SocketContext.Provider value={{
      mute,
      Mute,
      Unmute,
      mutevid,
      MuteVid,
      UnmuteVid,
      connectedToHost,
      sendMessage,
      setConnectedToHost,
      user,
      callAnswered,
      myVideo,
      peerVideo,
      stream,
      username,
      hostname,
      setHostName,
      setUserName,
      setCallAnswered,
      callFinished,
      me,
      userSignal,
      receivingCall,
      setReceivingCall,
      setHostID,
      hostID,
      endMeeting,
      connectToHost,
      endMeeting,
      answerUser,
      setText,
      setMessages,
      messages,
      text,
      setStream
      
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { ContextProvider, SocketContext };