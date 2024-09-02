import mongoose from 'mongoose';

const midiaSchema = new mongoose.Schema({
  tipoMidia: {
    type: String,
    enum: ['imagem', 'video'],
    required: true,
  },
  caminhoArquivo: {
    type: String,
  },
  linkExterno: {
    type: String,
  },
  textoSimples: {
    type: String,
  },
  conteudoHTML: {
    type: String,
  },
  imagemFundo: {
    type: String,
  },
});

const Midia = mongoose.model('Midia', midiaSchema);

export default Midia;
