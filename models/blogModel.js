import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  imageUrl: { // Agregar el campo imageUrl
    type: String,
    required: true // Puedes cambiar esto si no es obligatorio
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Blog', blogSchema);
