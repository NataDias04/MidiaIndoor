import mongoose, { Schema, Types } from 'mongoose';

const ImagemSchema = new Schema({
  nome: { type: String, required: true },
  url: { type: String, required: true },
  tipo:{
    type: String,
  },
  urlcache:{
    type: String,
  },
  data: { type: Date, default: Date.now }
})

const Imagem = mongoose.model('Imagem', ImagemSchema);

export default Imagem;