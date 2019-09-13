var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

//creamos una ruta
app.get('/hola-mundo', function(req, res){
    res.status(200).send('hola mundo desde una ruta');
});

//mensaje a todos los miembros
var message = [{
    id: 1,
    text: 'Bienvenido al chat privado',
    nickname: 'Arturo'
}];

//socket.io
io.on('connection', function(socket){
    console.log('el nodo con IP '+socket.handshake.address+' se ha conectado');

    //Emitir el mensaje
    socket.emit('message', message);

    //recibir evento
    socket.on('add-message', function(data){
        message.push(data);
        io.sockets.emit('message', message);
    });
});

//creamos un server
server.listen(6677, function(){
    console.log("el servidor esta funcionando en el localhost");
});