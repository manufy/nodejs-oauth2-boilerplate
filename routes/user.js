// Gestión de usuarios

// Inicializar passport

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , db = require('../db/schema');

// Inicialiar Mailer

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

// Páginas

exports.account = function(req, res) {
  res.render('account', { user: req.user, title : 'Perfil',description: 'Información del perfil',author: 'movendo.es',analyticssiteid: 'XXXXXXX'});
};

exports.getlogin = function(req, res) {
  res.render('login', { title : 'Formulario de entrada',description: 'Login',author: 'movendo.es',analyticssiteid: 'XXXXXXX' , user: req.user, message: req.session.messages });
};

exports.register = function(req, res) {
  res.render('register', { title : 'Formulario de registro',description: 'Registro',author: 'movendo.es',analyticssiteid: 'XXXXXXX' , user: req.user, message: req.session.messages });
};

exports.registersuccess = function(req, res) {
  res.render('registersuccess', { title : 'Registro efectuado',description: 'Registr correcto',author: 'movendo.es',analyticssiteid: 'XXXXXXX' , user: req.user, message: req.session.messages });
};


exports.admin = function(req, res) {
  res.send('Acceso ADMIN!');
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

// POST LOGIN

exports.postlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
};

// POST REGISTRO BASICO

exports.postRegister = function(req,res,next) {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  // Insertar en BD

  var newuser = new db.userModel({provider: 'email', username: username, password: password, email:email, admin:false});
  newuser.save(function(err) {
    if (err)
      console.log("Error grabando " + err);
    else
      console.log("Creado usuario: " + username)
  });

   // Enviar Mail
  nodemailer.send_mail({
    sender: 'PUTYOURS@yourhost',
    to: email,
    subject:'Nuevo registro'
  },function(error, success){
    console.log('Mensaje ' + success ? 'enviado' : 'error de envío');
  }); 

  // Llama a registersuccess(req,res) que se encuentra definido en el módulo exports (este mismo)
  exports.registersuccess(req,res);
};

