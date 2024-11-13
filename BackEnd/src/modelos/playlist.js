import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  ordemMidias: [{
    nome: String,
    url: String,
    midia: { type: String, required: true },
    posicao: { 
      type: String, 
      enum: ['centro', 'direita', 'direita-cima', 'esquerda','baixo','baixo-esquerda'], 
      required: true 
    },
    ordem: { type: Number, required: true },
    tempo: { type: Number, required: true }
  }],
  criadoEm: { type: Date, default: Date.now }
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);
export default Playlist;
