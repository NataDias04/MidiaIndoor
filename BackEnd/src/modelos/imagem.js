import mongoose, { Schema, Types } from 'mongoose';

const ImagemSchema = new Schema({
  nome: { type: String, required: true },
  url: { type: String, required: true },
  data: { type: Date, default: Date.now }
})

const Imagem = mongoose.model('Imagem', ImagemSchema);

export default Imagem;