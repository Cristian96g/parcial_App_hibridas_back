import Users from '../models/userModel.js';
import bcrypt from "bcryptjs";
import 'dotenv/config';
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  try {
    let usuarios = await Users.find();
    res.json(usuarios);
  } catch (error) {
    res.status(400).json({
      error
    });
  }
};

const getUser = async (req, res) => {
  try {
    let usuario = await Users.findById(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(400).json({
      error
    });
  }
};

const registerUser = async (req, res) => {
  try {
    let body = req.body;

    let usuario = new Users({
      email: body.email,
      name: body.name,
      username: body.username,
      password: bcrypt.hashSync(body.password, 10),
      role: "user" // Asegúrate de que el rol sea siempre "user"
    });
    let savedUser = await usuario.save();

    res.json({
      user: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(datos => {
      if (datos) {
        const passwordValido = bcrypt.compareSync(req.body.password, datos.password);
        if (!passwordValido) return res.status(400).json({ error: 'ok', msj: "Usuario o contraseña incorrecta." });
        const jwToken = jwt.sign({
          usuario: {
            _id: datos._id,
            name: datos.name,
            username: datos.username,
            email: datos.email,
            role: datos.role // Incluye el rol en el token
          }
        },
          process.env.SEED, { expiresIn: process.env.EXPIRATION });
        res.json({
          usuario: {
            _id: datos._id,
            name: datos.name,
            username: datos.username,
            email: datos.email,
            role: datos.role // Incluye el rol en la respuesta
          },
          jwToken
        });
      } else {
        res.status(400).json({
          error: 'ok',
          msj: 'Usuario o contraseña incorrecta'
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        error: 'ok',
        msj: 'Error en el servicio' + err
      });
    });
};

const deleteUser = async (req, res) => {
    try {
      const deletedUser = await Users.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: 'El usuario no funciona' });
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: 'El usuario no funciona' });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
};
