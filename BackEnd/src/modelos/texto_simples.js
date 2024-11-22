import mongoose from 'mongoose';

const TextoSchema = new mongoose.Schema({
  conteudo: {
    type: String,
    required: true,
  },
  tipo:{
    type: String,
    default: "",
  },
  urlcache:{
    type: String,
    default: "",
  },
  date: { type: Date, default: Date.now }
});

const Texto = mongoose.model('Texto', TextoSchema);

export default Texto;
