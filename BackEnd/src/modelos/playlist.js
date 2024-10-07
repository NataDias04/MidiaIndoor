import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  ordemMidias: [{
    midia: { type: mongoose.Schema.Types.ObjectId, ref: 'Midia', required: true }, // Referência ao modelo Midia
    posicao: { 
      type: String, 
      enum: ['top', 'bottom', 'left', 'right', 'center'], 
      required: true 
    }, // Posição da mídia
    ordem: { type: Number, required: true }, // Ordem de exibição
    tempo: { type: Number, required: true } // Tempo de exibição em segundos
  }],
  criadoEm: { type: Date, default: Date.now }
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);
export default Playlist;
