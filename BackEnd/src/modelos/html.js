import mongoose from 'mongoose';

const HtmlSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
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
  data: {
    type: Date,
    default: Date.now,
  },
});
const Html = mongoose.model('Html', HtmlSchema);

export default Html;
