var socket = io.connect('http://localhost:4000');
var persona = document.getElementById('persona'),
  appChat = document.getElementById('app-chat'),
  panelBienvenida = document.getElementById('panel-bienvenida'),
  usuario = document.getElementById('usuario'),
  mensaje = document.getElementById('mensaje'),
  botonEnviar = document.getElementById('enviar'),
  escribiendoMensaje = document.getElementById('escribiendo-mensaje'),
  output = document.getElementById('output');

var audioNotificacion = new Audio('nota.mp3'); // Agrega el sonido de notificación

botonEnviar.addEventListener('click', function () {
  if (mensaje.value){
    socket.emit('chat', {
      mensaje: mensaje.value,
      usuario: usuario.value,
    });
  }
  mensaje.value = '';
});

mensaje.addEventListener('keyup', function() {
  if (persona.value) {
    socket.emit('typing', {
      nombre: usuario.value,
      texto: mensaje.value
    });
  }
});

socket.on('chat', function (data){
  escribiendoMensaje.innerHTML = '';
  output.innerHTML +='<p><strong>' + data.usuario + ':</strong>' + data.mensaje + '</p>';
  audioNotificacion.play(); // Reproduce el sonido al recibir un mensaje
});

socket.on('typing', function (data){
  if (data.texto) {
    escribiendoMensaje.innerHTML = '<p><em>' + data.nombre + ' esta escribiendo un mensaje...</em></p>';
  } else {
    escribiendoMensaje.innerHTML = '';
  }
});

function ingresarAlChat() {
  if (persona.value) {
    panelBienvenida.style.display = "none";
    appChat.style.display = "block";
    var nombreDeUsuario = persona.value;
    usuario.value = nombreDeUsuario;
    usuario.readOnly = true;
  }
}