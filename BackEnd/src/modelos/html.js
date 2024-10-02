import mongoose from 'mongoose';

const HtmlSchema = new mongoose.Schema({
  conteudoHtml: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

const Html = mongoose.model('Html', HtmlSchema);

export default Html;
