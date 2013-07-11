// Globales

var red, blue, reset;
red   = '\u001b[31m';
blue  = '\u001b[34m';
reset = '\u001b[0m';

console.log(red + 'manufy@boilerplate' + reset + ' node.js ' + blue + ' server v1.0' + reset);

var connect = require('connect')
    express = require('express'),
    io = require('socket.io'),
    port = (process.env.PORT || 8081),
    db = require('./db/schema'),
    pass = require('./config/pass'),
    passport = require('passport'),
    basic_routes = require('./routes/basic'),
    user_routes = require('./routes/user')
    ;

// Cargar y configurar mailer

var nodemailer = require('nodemailer');
nodemailer.SMTP = {
  host: 'PUTYOURS',
  port: 465,
  use_authentication: true,
  ssl: true,
  user: 'PUTYOURS',
  pass: 'PUTYOURS',
  debug: true
}


// Inicializar Express

var server = express.createServer();
server.configure(function(){
    server.set('view engine', 'jade');
    server.use(express.logger());
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.methodOverride());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(connect.static(__dirname + '/static'));
    server.use(passport.initialize());
    server.use(passport.session());  
    server.use(server.router);
});

// Inicializar Socket.IO PORHACER: SEPARAR A OTRO FICHERO

var io = io.listen(server);
io.sockets.on('connection', function(socket){
  console.log('Client Connected');
  socket.on('message', function(data){
    socket.broadcast.emit('server_message',data);
    socket.emit('server_message',data);
  });
  socket.on('disconnect', function(){
    console.log('Client Disconnected.');
  });
});

// Comenzar ...

server.listen( port);

///////////////////////////////////////////
//              Routes GET / POST        //
///////////////////////////////////////////

// Páginas básicas, sin autentificar

server.get('/', basic_routes.index);
server.get('/registersuccess', user_routes.registersuccess);

// Gestión de Usuarios

server.get('/account', pass.ensureAuthenticated, user_routes.account);
server.get('/login', user_routes.getlogin);
server.post('/login', user_routes.postlogin);
server.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin(), user_routes.admin);
server.get('/register', user_routes.register);
server.get('/logout', user_routes.logout);
server.post('/register', user_routes.postRegister);

// Twitter

server.get('/auth/twitter', passport.authenticate('twitter'));
server.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/auth/twitter' }));

// Ruta para error 500, útil
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

// 404 - Mantener como última ruta

server.get('/*', function(req, res){
    throw new NotFound;
});

console.log('sistema iniciado en http://0.0.0.0:' + port );


