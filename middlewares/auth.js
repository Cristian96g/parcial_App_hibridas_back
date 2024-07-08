import jwt from "jsonwebtoken";
import 'dotenv/config';

let verificarToken = (req, res, next) => {
  let token = req.get('token');
  jwt.verify(token, process.env.SEED, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        error
      });
    }
    req.usuario = decoded.usuario;
    next();
  });
};

let verificarAdminRole = (req, res, next) => {
  let usuario = req.usuario;
  if (usuario.role !== 'admin') {
    return res.status(403).json({
      error: 'No tienes permisos para realizar esta acción'
    });
  }
  next();
};

export { verificarToken, verificarAdminRole };
