import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController.js';
import multer from 'multer';
import path from 'path';

// Configurar Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  
  const upload = multer({ storage: storage });



const blogRoutes = express.Router();

blogRoutes.get('/', getBlogs);
blogRoutes.post('/', upload.single('image'), createBlog);
blogRoutes.get('/:id', getBlogById);
blogRoutes.put('/:id', updateBlog);
blogRoutes.delete('/:id', deleteBlog);

export { blogRoutes };
