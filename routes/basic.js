// Rutas básicas

exports.index = function(req, res) {
  res.render('index', { user: req.user,  title: "Titulo", author: "Yo", description :"des" });
};
