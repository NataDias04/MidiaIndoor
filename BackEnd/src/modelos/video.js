import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true }, // Caminho do vídeo
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
