import express from "express";
import { enviarCorreo } from '../controllers/emailController.js';

const emailRoutes = express.Router();

emailRoutes.post('/enviar-formulario', enviarCorreo);

export {emailRoutes};