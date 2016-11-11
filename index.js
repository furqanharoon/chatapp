var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);


var users = {};

app.get('/',function(req,res){
  // res.send('<h1>Hello World</h1>');
  res.sendFile(__dirname+'/index.html');

});

io.on('connection',function(socket){

  console.log("A user connected");
  console.log("Socket Id issss");
  console.log(socket.id);

  socket.on('chat message',function(msg){
    console.log("message : "+ msg);
    console.log("Username issss");
    console.log(users[socket.id]);
    io.emit('show message',msg,users[socket.id]);

  });

  socket.on("join",function(userName){
    users[socket.id] = userName;
    io.emit('user join',userName);
  });

  socket.on('disconnect',function(){
    console.log(users[socket.id] + " left the chat");
    delete users[socket.id];
  });
});

http.listen(3000,function(){
  console.log("Listening on Port 3000");
});

