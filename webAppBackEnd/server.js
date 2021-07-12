var express = require('express')
var app = express()
var cors = require("cors");
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
	//to create a new socket.io instance using the created server on server side
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});
app.use(cors());
var port = process.env.PORT || 5000;
//parameters : location root, request to response
app.get('/', (req, res) => {
  res.send('Working.')
})

io.on("connection", function(socket){//listen for the connection event and runs the function whenever it happens.
	console.log("Connection made with server by : ",socket.id);
	socket.emit("me", socket.id);//send message and information to all clients

	socket.on("disconnect", () => {//send message to all except the sender 
		socket.broadcast.emit("callFinished")
	});
	socket.on("sendMessage",(data) => {//send message from sender to the other peer
		io.to(data.to).emit("message", data.from,data.fromID, data.message);
	})
	socket.on("connectToHost", (data) => {//send data from server-----> host
		io.to(data.host).emit("connectToHost", { signal: data.signalData, from: data.from, name: data.name  });
	});

	socket.on("answerUser", (data) => {//send data from server-----> user
		io.to(data.to).emit("callAnswered", data.signal, data.name);
	});
});

server.listen(port, () => console.log(`Server is running on port ${port}`));