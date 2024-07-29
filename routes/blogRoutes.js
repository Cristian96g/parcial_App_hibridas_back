import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController.js';

const blogRoutes = express.Router();

blogRoutes.get('/', getBlogs);
blogRoutes.post('/', createBlog); // Elimina upload.single('image')
blogRoutes.get('/:id', getBlogById);
blogRoutes.put('/:id', updateBlog); // Elimina upload.single('image')
blogRoutes.delete('/:id', deleteBlog);

export { blogRoutes };
