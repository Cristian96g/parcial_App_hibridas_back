import Comment from '../models/commentModel.js';

// Crear un nuevo comentario
export const createComment = async (req, res) => {
    try {
        const { blog, user, content } = req.body;

        const newComment = new Comment({
            blog,
            user,
            content,
        });

        const savedComment = await newComment.save();

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los comentarios
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('blog user');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener comentario por ID
export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id)
            .populate('blog', 'title') // Popula el campo blog y trae solo el título
            .populate('user', 'username'); // Popula el campo user y trae solo el nombre de usuario
        if (!comment) {
            return res.status(404).json({ message: 'El comentario no funciona' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener comentarios por ID de blog
export const getCommentsByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blog: blogId }).populate('user');

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Actualizar un comentario
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        ).populate('blog user');

        if (!updatedComment) {
            return res.status(404).json({ message: 'El comentario no funciona' });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({ message: 'El comentario no funciona' });
        }

        res.json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};