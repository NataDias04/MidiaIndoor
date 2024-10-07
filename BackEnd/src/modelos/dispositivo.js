import mongoose from 'mongoose';

const DispositivoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  resolucao: { type: String, required: true },
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist', // Referência à playlist atual que o dispositivo deve exibir
    required: false
  }
});

const Dispositivo = mongoose.model('Dispositivo', DispositivoSchema);

export default Dispositivo;
