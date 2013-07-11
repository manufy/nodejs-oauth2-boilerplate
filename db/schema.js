// Inicializar Mongoose

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;
exports.mongoose = mongoose;

// Conexión a BBDD

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/esqueleto';

// Opciones

var mongoOptions = { db: { safe: true }};

// Realiza conexión

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { 
    console.log ('ERROR conectando a mongodb: ' + uristring + '. ' + err);
  } else {
    console.log ('Conexión a mongodb correcta: ' + uristring);
  }
});

/////////////////////////////////// Esquema //////////////////////////////////

var Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectId;

// User schema

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: false },
  password: { type: String, required: true},
  admin: { type: Boolean, required: true },
  provider: { type: String, required: false}
});

// Middleware Bcrypt para autentificación básica

userSchema.pre('save', function(next) {
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

// Verificación de clave

userSchema.methods.comparePassword = function(candidatePassword, cb) {

	// Función de comparación

	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
		// NOTA: para test cb(null,true);
	});
};

// Exportar modelos

var userModel = mongoose.model('User', userSchema);
exports.userModel = userModel;
