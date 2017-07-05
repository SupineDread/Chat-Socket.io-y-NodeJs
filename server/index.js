var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/holamundo', function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
});

var messages=[{
    id:1,
    text: 'Bienvenido al chat',
    nickname: 'Bot - SupineDread89'
}];

io.on('connection', function(socket){
    console.log('Alguien se ha conectado con la ip: ' + socket.handshake.address);
    socket.emit('messages', messages);
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(8080, function(){
    console.log('El servidor esta funcionando en http://localhost:8080');
});