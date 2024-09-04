import mongoose from 'mongoose';

const TextoSchema = new mongoose.Schema({
  conteudo: {
    type: String,
    required: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

const Texto = mongoose.model('Texto', TextoSchema);

export default Texto;
