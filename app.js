var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var i = 0;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected')

    var socketId = socket.id + " user " + i++;
    var clientIp = socket.request.connection.remoteAddress;


  io.emit('chat message', "user connected");
  io.emit('chat message', socketId);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  /*  io.emit('chat message', { for: 'everyone', 'chat-msg': msg });*/
    console.log('message: ' + msg);
  });

  socket.on('disconnect', function() {
    io.emit('chat message', "user disconnected");
  });

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
