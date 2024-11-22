import mongoose from 'mongoose';

const DispositivoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  resolucao: { type: String, required: true },
  tipo: { type: String, required: true },
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', required: false },
  data: { type: Date, default: Date.now },
});

const Dispositivo = mongoose.model('Dispositivo', DispositivoSchema);

export default Dispositivo;
