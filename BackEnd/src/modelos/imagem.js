import mongoose, { Schema, Types } from 'mongoose';

//const Schema = mongoose.Schema

const ImagemSchema = new Schema({
  name: {type: String, require: true},
  src: {type: String, require: true},
})

const Imagem = mongoose.model('Imagem', ImagemSchema);

export default Imagem;