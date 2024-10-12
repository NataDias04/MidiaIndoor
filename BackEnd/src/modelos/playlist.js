import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  ordemMidias: [{
    nome: String,
    url: String,
    posicao: { 
      type: String, 
      enum: ['centro', 'direita', 'dreita-cima', 'esquerda','baixo','baixo-esquerda'], 
      required: true 
    }, // Posição da mídia
    ordem: { type: Number, required: true }, // Ordem de exibição
    tempo: { type: Number, required: true } // Tempo de exibição em segundos
  }],
  criadoEm: { type: Date, default: Date.now }
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);
export default Playlist;
