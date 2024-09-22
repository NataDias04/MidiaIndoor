import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  midias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Midia' // Referência para as mídias (imagens, vídeos, textos)
  }],
  layout: {
    type: String, 
    required: true,
    enum: ['grid', 'fullscreen', 'carousel'] // Layouts disponíveis
  },
  ordemMidias: [{
    midia: { type: mongoose.Schema.Types.ObjectId, ref: 'Midia' },
    posicao: { type: String, enum: ['top', 'bottom', 'left', 'right', 'center'] },
    ordem: { type: Number }  // Definir a ordem no carrossel ou layout
  }]
}, { timestamps: true });

const Playlist = mongoose.model('Playlist', PlaylistSchema);
export default Playlist;
