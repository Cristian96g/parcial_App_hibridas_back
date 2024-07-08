import express from 'express';
import { createComment, getCommentsByBlogId, getAllComments, updateComment, getCommentById, deleteComment } from '../controllers/commentController.js';

const commentRoutes = express.Router();

commentRoutes.post('/', createComment);
commentRoutes.get('/:id', getCommentById);
commentRoutes.get('/', getAllComments);
commentRoutes.get('/blog/:blogId', getCommentsByBlogId);
commentRoutes.put('/:id', updateComment);
commentRoutes.delete('/:id', deleteComment);


export { commentRoutes };
