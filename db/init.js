// Funciones síncronas

var seq = require("parseq").seq;

// Esquema

var db = require('./schema');

// Crear ususario

function createUser(parentobj, user, emailaddress, pass, adm) {
	var user = new db.userModel({ username: user
					, email: emailaddress
					, password: pass
					, admin: adm });
	user.save(function(err) {
		if(err) {
			console.log(err);
			parentobj(err);
		} else {
			console.log('creado usuario: ' + user.username);
			parentobj(err);
		}
	});

}

createUser(this, 'admin', 'admin@example.com', 'secret', true);
createUser(this, 'bob', 'bob@example.com', 'secret', false);
	
