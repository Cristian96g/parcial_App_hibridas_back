import express from "express";
import { getUsers, getUser, registerUser, loginUser, deleteUser, updateUser} from '../controllers/userController.js';


const userRoutes = express.Router();

// Definir rutas
userRoutes.get('/', getUsers);

userRoutes.get('/find/:id', getUser);

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser)

userRoutes.put('/:id', updateUser);

userRoutes.delete('/:id', deleteUser);

export {userRoutes};
