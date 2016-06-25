var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, './app')));

server.listen(3000, function () {
  console.log('App listening on port 3000');
});

io.on('connection', function (socket) {
    console.log('User connected. Socket id %s', socket.id);

    socket.on('disconnect', function () {
        console.log('User disconnected. %s. Socket id %s', socket.id);
    });
});
