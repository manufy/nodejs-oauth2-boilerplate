// Globales


var red, blue, reset;
red   = '\u001b[31m';
blue  = '\u001b[34m';
reset = '\u001b[0m';

// Inicializar Passport

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , db = require('../db/schema');

// Serialización de sesiones

passport.serializeUser(function(user, done) {
  console.log(blue + "serialize userid: " + user._id + reset);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log(blue + "deserialize userid: " + id + reset);
  db.userModel.findById(id, function (err, user) {
    console.log(red + user + reset);
    done(err, user);
  });
});

// Estrategia de autentificación local usuario/clave

passport.use(new LocalStrategy(function(username, password, done) {
  db.userModel.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Usuario desconocido ' + username }); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Contraseña inválida' });
      }
    });  
  });
}));

////////////////////////////////////// Twitter ////////////////////////////////////////

passport.use(new TwitterStrategy({
      consumerKey: 'PUTYOURS',
      consumerSecret: 'PUTYOURS',
      callbackURL: "http://PUTYOURS/auth/twitter/callback",
      passReqToCallback: true
  },
  function(req,token, tokenSecret, profile, done) {
    
   if (!req.user) {
      console.log(blue + "no logeado, autentificar en base a twitter" + reset)
    } else {
      console.log(blue + "autentificado, asociar cuenta twitter con usuario")
    }

    // En este punto el usuario ha autorizado la app en twitter
    // Intentar una inserción en BD

    console.log(profile);

    var newuser = new db.userModel({
      provider: profile.provider,
      username: profile.username,
      password: token,
      email:'-',
      admin:false});

    // Grabar el nuevo usuario o determinar si ya tiene cuenta
    // Se intenta grabar

    newuser.save(function(err) {

     // En caso de error

    if ( err && err.code !== 11000 ) {
       console.log(err);
       console.log(err.code);
       res.send('Another error showed up');
       return;
    }

    // Si es clave duplicada

    if (err && err.code === 11000) {
    console.log("Error grabando " + err);

    // Asi se fuerza un id ya existente

    // newuser._id = "514f16fda8e531e923000001";
    //console.log("newuser.id: " +  newuser.id );

    // Asi se recupera un usuario por username 

    db.userModel.findOne({ provider:"twitter", username: profile.username }, function(err, user) {
      if (err) { return done(null,false); }         
        console.log("encontrado: " + user);
        done(null,user);
      });

    //  done(null, newuser);
    }

    // Si no hubo errores, se crea el usuario por primera vez

    else {
      console.log("Creado usuario: " + profile.username);
      console.log("newuser.id: " +  newuser.id )
      done(null, newuser);
      }
    }); 
  }
));

////////////////////////////////////// Facebook ////////////////////////////////////////

passport.use(new TwitterStrategy({
      consumerKey: 'inK9VG2X0YpsC0xUWjPEQ',
      consumerSecret: 'PUTYOURS',
      callbackURL: "http://PUTYOURS/auth/twitter/callback",
      passReqToCallback: true
  },
  function(req,token, tokenSecret, profile, done) {
    
   if (!req.user) {
      console.log(blue + "no logeado, autentificar en base a twitter" + reset)
    } else {
      console.log(blue + "autentificado, asociar cuenta twitter con usuario")
    }

    // En este punto el usuario ha autorizado la app en twitter
    // Intentar una inserción en BD

    console.log(profile);

    var newuser = new db.userModel({
      provider: profile.provider,
      username: profile.username,
      password: token,
      email:'-',
      admin:false});

    // Grabar el nuevo usuario o determinar si ya tiene cuenta
    // Se intenta grabar

    newuser.save(function(err) {

     // En caso de error

    if ( err && err.code !== 11000 ) {
       console.log(err);
       console.log(err.code);
       res.send('Another error showed up');
       return;
    }

    // Si es clave duplicada

    if (err && err.code === 11000) {
    console.log("Error grabando " + err);

    // Asi se fuerza un id ya existente

    // newuser._id = "514f16fda8e531e923000001";
    //console.log("newuser.id: " +  newuser.id );

    // Asi se recupera un usuario por username 

    db.userModel.findOne({ provider:"twitter", username: profile.username }, function(err, user) {
      if (err) { return done(null,false); }         
        console.log("encontrado: " + user);
        done(null,user);
      });

    //  done(null, newuser);
    }

    // Si no hubo errores, se crea el usuario por primera vez

    else {
      console.log("Creado usuario: " + profile.username);
      console.log("newuser.id: " +  newuser.id )
      done(null, newuser);
      }
    }); 
  }
));

////////////////////////////////////// Google+ ////////////////////////////////////////

passport.use(new TwitterStrategy({
      consumerKey: 'PUTYOURS',
      consumerSecret: 'PUTYOURS',
      callbackURL: "http://PUTYOURS/auth/twitter/callback",
      passReqToCallback: true
  },
  function(req,token, tokenSecret, profile, done) {
    
   if (!req.user) {
      console.log(blue + "no logeado, autentificar en base a twitter" + reset)
    } else {
      console.log(blue + "autentificado, asociar cuenta twitter con usuario")
    }

    // En este punto el usuario ha autorizado la app en twitter
    // Intentar una inserción en BD

    console.log(profile);

    var newuser = new db.userModel({
      provider: profile.provider,
      username: profile.username,
      password: token,
      email:'-',
      admin:false});

    // Grabar el nuevo usuario o determinar si ya tiene cuenta
    // Se intenta grabar

    newuser.save(function(err) {

     // En caso de error

    if ( err && err.code !== 11000 ) {
       console.log(err);
       console.log(err.code);
       res.send('Another error showed up');
       return;
    }

    // Si es clave duplicada

    if (err && err.code === 11000) {
    console.log("Error grabando " + err);

    // Asi se fuerza un id ya existente

    // newuser._id = "514f16fda8e531e923000001";
    //console.log("newuser.id: " +  newuser.id );

    // Asi se recupera un usuario por username 

    db.userModel.findOne({ provider:"twitter", username: profile.username }, function(err, user) {
      if (err) { return done(null,false); }         
        console.log("encontrado: " + user);
        done(null,user);
      });

    //  done(null, newuser);
    }

    // Si no hubo errores, se crea el usuario por primera vez

    else {
      console.log("Creado usuario: " + profile.username);
      console.log("newuser.id: " +  newuser.id )
      done(null, newuser);
      }
    }); 
  }
));

////////////////////////////////////// Foursquare ////////////////////////////////////////

passport.use(new TwitterStrategy({
      consumerKey: 'PUTYOURS',
      consumerSecret: 'PUTYOURS',
      callbackURL: "PUTYOURS",
      passReqToCallback: true
  },
  function(req,token, tokenSecret, profile, done) {
    
   if (!req.user) {
      console.log(blue + "no logeado, autentificar en base a twitter" + reset)
    } else {
      console.log(blue + "autentificado, asociar cuenta twitter con usuario")
    }

    // En este punto el usuario ha autorizado la app en twitter
    // Intentar una inserción en BD

    console.log(profile);

    var newuser = new db.userModel({
      provider: profile.provider,
      username: profile.username,
      password: token,
      email:'-',
      admin:false});

    // Grabar el nuevo usuario o determinar si ya tiene cuenta
    // Se intenta grabar

    newuser.save(function(err) {

     // En caso de error

    if ( err && err.code !== 11000 ) {
       console.log(err);
       console.log(err.code);
       res.send('Another error showed up');
       return;
    }

    // Si es clave duplicada

    if (err && err.code === 11000) {
    console.log("Error grabando " + err);

    // Asi se fuerza un id ya existente

    // newuser._id = "514f16fda8e531e923000001";
    //console.log("newuser.id: " +  newuser.id );

    // Asi se recupera un usuario por username 

    db.userModel.findOne({ provider:"twitter", username: profile.username }, function(err, user) {
      if (err) { return done(null,false); }         
        console.log("encontrado: " + user);
        done(null,user);
      });

    //  done(null, newuser);
    }

    // Si no hubo errores, se crea el usuario por primera vez

    else {
      console.log("Creado usuario: " + profile.username);
      console.log("newuser.id: " +  newuser.id )
      done(null, newuser);
      }
    }); 
  }
));

////////////////////////////////////// Instagram ////////////////////////////////////////

passport.use(new TwitterStrategy({
      consumerKey: 'PUTYOURS',
      consumerSecret: 'PUTYOURS',
      callbackURL: "http:/PUTYOURS/auth/twitter/callback",
      passReqToCallback: true
  },
  function(req,token, tokenSecret, profile, done) {
    
   if (!req.user) {
      console.log(blue + "no logeado, autentificar en base a twitter" + reset)
    } else {
      console.log(blue + "autentificado, asociar cuenta twitter con usuario")
    }

    // En este punto el usuario ha autorizado la app en twitter
    // Intentar una inserción en BD

    console.log(profile);

    var newuser = new db.userModel({
      provider: profile.provider,
      username: profile.username,
      password: token,
      email:'-',
      admin:false});

    // Grabar el nuevo usuario o determinar si ya tiene cuenta
    // Se intenta grabar

    newuser.save(function(err) {

     // En caso de error

    if ( err && err.code !== 11000 ) {
       console.log(err);
       console.log(err.code);
       res.send('Another error showed up');
       return;
    }

    // Si es clave duplicada

    if (err && err.code === 11000) {
    console.log("Error grabando " + err);

    // Asi se fuerza un id ya existente

    // newuser._id = "514f16fda8e531e923000001";
    //console.log("newuser.id: " +  newuser.id );

    // Asi se recupera un usuario por username 

    db.userModel.findOne({ provider:"twitter", username: profile.username }, function(err, user) {
      if (err) { return done(null,false); }         
        console.log("encontrado: " + user);
        done(null,user);
      });

    //  done(null, newuser);
    }

    // Si no hubo errores, se crea el usuario por primera vez

    else {
      console.log("Creado usuario: " + profile.username);
      console.log("newuser.id: " +  newuser.id )
      done(null, newuser);
      }
    }); 
  }
));

////////////////////////////////////// LinkedIn ////////////////////////////////////////

passport.use(new TwitterStrategy({
      consumerKey: 'PUTYOURS',
      consumerSecret: 'PUTYOURS',
      callbackURL: "http://PUTYOURS/auth/twitter/callback",
      passReqToCallback: true
  },
  function(req,token, tokenSecret, profile, done) {
    
   if (!req.user) {
      console.log(blue + "no logeado, autentificar en base a twitter" + reset)
    } else {
      console.log(blue + "autentificado, asociar cuenta twitter con usuario")
    }

    // En este punto el usuario ha autorizado la app en twitter
    // Intentar una inserción en BD

    console.log(profile);

    var newuser = new db.userModel({
      provider: profile.provider,
      username: profile.username,
      password: token,
      email:'-',
      admin:false});

    // Grabar el nuevo usuario o determinar si ya tiene cuenta
    // Se intenta grabar

    newuser.save(function(err) {

     // En caso de error

    if ( err && err.code !== 11000 ) {
       console.log(err);
       console.log(err.code);
       res.send('Another error showed up');
       return;
    }

    // Si es clave duplicada

    if (err && err.code === 11000) {
    console.log("Error grabando " + err);

    // Asi se fuerza un id ya existente

    // newuser._id = "514f16fda8e531e923000001";
    //console.log("newuser.id: " +  newuser.id );

    // Asi se recupera un usuario por username 

    db.userModel.findOne({ provider:"twitter", username: profile.username }, function(err, user) {
      if (err) { return done(null,false); }         
        console.log("encontrado: " + user);
        done(null,user);
      });

    //  done(null, newuser);
    }

    // Si no hubo errores, se crea el usuario por primera vez

    else {
      console.log("Creado usuario: " + profile.username);
      console.log("newuser.id: " +  newuser.id )
      done(null, newuser);
      }
    }); 
  }
));

// Midlleware para garantizar autentificación

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/logout')
}


// Middleware para admin

exports.ensureAdmin = function ensureAdmin(req, res, next) {
    return function(req, res, next) {
	console.log(req.user);
        if(req.user && req.user.admin === true)
            next();
        else
            res.send(403);
    }
}
