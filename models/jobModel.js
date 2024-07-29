import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  imageUrl: { // Agregar el campo imageUrl
    type: String,
    required: true // Puedes cambiar esto si no es obligatorio
  }
});

export default mongoose.model('Job', jobSchema);
