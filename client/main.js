//El connect cambia dependiendo tu ip local.
//var socket = io.connect('http://10.0.0.23:6677', {'forceNew': true});
var socket = io.connect('http://localhost:6677', {'forceNew': true});

socket.on('message', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    var div_msg = document.getElementById('mensajes');
    div_msg.innerHTML = html;

    var cmsj = document.getElementById('c-msj');
    cmsj.scrollTop = cmsj.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}
