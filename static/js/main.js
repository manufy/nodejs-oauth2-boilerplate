console.log("main.js start client framework by @manufy");
// POR HACER: nova require(["vendor/humane.min"] , function($) { console.log("humane loaded");});
require([ // "order!vendor/socket.io",
  	    //"order!vendor/humane.min",
  	     "order!vendor/three.js/build/three.min",
  	    // "order!vendor/scenejs",
		 "order!vendor/jquery-1.9.1.min",
         "order!vendor/jquery-ui-1.10.2.custom.min",     
         "order!vendor/underscore-min",
         "order!vendor/underscore.string.min",
         "order!vendor/less-1.3.0.min",
         "order!vendor/haml",
         "order!vendor/backbone",  
         "order!coffeejs/app",
         "order!app/threejsparticles",
       //  "order!script"
         ], function($) {
	

	    //This function is called when scripts/helper/util.js is loaded.
	    //If util.js calls define(), then this function is not fired until
	    //util's dependencies have loaded, and the util argument will hold
	    //the module value for "helper/util".
	    
		app();
	
	
	});



function app() {
	console.log("app() start ...");
//	humane.log("node.js boilerplate passport socket.io 3d framework by @manufy");



var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', 'Recibido mensaje enviado el  ' + new Date());     
  });

  socket.on('server_message', function(data){
  	humane.log("Nuevo mensaje ...")
   $('#receiver').append('<li>' + data + '</li>');  
  });
	

}

