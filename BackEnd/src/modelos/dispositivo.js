import mongoose from 'mongoose';

const DispositivoSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // Nome ou identificador do dispositivo
  localizacao: { type: String }, // Local onde o dispositivo está (opcional)
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist', // Referência à playlist atual que o dispositivo deve exibir
    required: false
  },
  status: {
    type: String,
    enum: ['ativo', 'inativo'],
    default: 'ativo'
  },
}, { timestamps: true });

const Dispositivo = mongoose.model('Dispositivo', DispositivoSchema);

export default Dispositivo;
