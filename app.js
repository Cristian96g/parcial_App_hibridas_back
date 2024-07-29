// backend/app.js
import express from "express";
import mongoose from "mongoose";
import { userRoutes } from "./routes/index.js"
import { commentRoutes } from "./routes/index.js";
import { blogRoutes } from "./routes/blogRoutes.js"
import { emailRoutes } from "./routes/emailRoutes.js"
import { jobRoutes } from './routes/jobRoutes.js'
import cors from "cors"

mongoose.connect("mongodb://127.0.0.1:27017/fundacion", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("conectado a MongoDb")
  })
  .catch(err => console.log("no se pudo conectar con MongoDB..", err));

const app = express();
// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto al puerto donde está corriendo tu frontend si es diferente
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/emails', emailRoutes); 

// // Middleware para servir archivos estáticos
// console.log('Serving static files from:', path.join(__dirname, 'uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
  res.send("kanban database");
});

const PORT = process.env.PORT || 3002;

// Rutas
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/comments', commentRoutes);
app.use('/jobs', jobRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
