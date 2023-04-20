function isAdmin(req, res, next) {
  if (req.session.data && req.session.data.role.includes('administrador')) {
    next();
  } else {
    res.status(403).send('Acceso denegado: no eres un administrador');
  }
}

module.exports = isAdmin;
