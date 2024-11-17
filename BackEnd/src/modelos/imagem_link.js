import mongoose from 'mongoose';

const ImagemLinkSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  caminhointerno: {type: String, required: true },
  url: { type: String, required: true },
  tipo:{
    type: String,
  },
  urlcache:{
    type: String,
  },
  data: { type: Date, default: Date.now }
});

const Imagem_link =mongoose.model("ImagemLink", ImagemLinkSchema);

export default Imagem_link