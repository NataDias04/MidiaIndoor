import mongoose from 'mongoose';

const ImagemLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String },      
  externalUrl: { type: String, required: true},   
});

const Imagem_link =mongoose.model("ImagemLink", ImagemLinkSchema);

export default Imagem_link