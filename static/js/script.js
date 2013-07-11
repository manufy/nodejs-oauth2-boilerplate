/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', 'Recibido mensaje enviado el  ' + new Date());     
  });

  socket.on('server_message', function(data){
  	humane.log("Nuevo mensaje ...")
   $('#receiver').append('<li>' + data + '</li>');  
  });
});